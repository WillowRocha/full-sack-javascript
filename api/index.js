const http = require('http');
const url = require('url');
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const server = http.createServer( async (req, res) => {

    const [collectionName, idObject] = url.parse(req.url, true).pathname.replace(/^\//, '').split('/');
    if( !collectionName ) {
        res.writeHead(404);
        res.end('invalid path');
        return;
    }

    const client = await connection('mongodb://192.168.99.100:27017');
    const db = await client.db('fullstack');
    
    const collection = db.collection(collectionName);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    switch(req.method) {
        case 'POST':
            const body = await parseBody(req);
            const saved = await collection.insertOne(body);
            res.end(JSON.stringify(saved));
            break;
        case 'GET':
            if( idObject ) {
                const object = await collection.findOne({_id:ObjectId(idObject)});
                res.end(JSON.stringify(object));
            } else {
                const list = await collection.find({}).toArray();
                res.end(JSON.stringify(list));
            }
            break;
        case 'PUT':
            if( idObject ) {
                const body = await parseBody(req);
                const saved = await collection.updateOne({_id:ObjectId(idObject)}, {'$set':body}, {upsert: true});
                res.end(JSON.stringify(saved));
            } else {
                res.end('invalid param');
            }
            break;
        case 'OPTIONS':
            var headers = {};
            headers["Access-Control-Allow-Origin"] = "*";
            headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
            headers["Access-Control-Allow-Credentials"] = false;
            headers["Access-Control-Max-Age"] = '86400'; // 24 hours
            headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
            res.writeHead(200, headers);
            res.end();
            break;
        default:
            res.end('invalid');
    }
    client.close();
});

server.listen(3000, () => console.log('start 3000'))



const parseBody = (req) => {
    return new Promise( (resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => resolve(JSON.parse(body)));
    });
}