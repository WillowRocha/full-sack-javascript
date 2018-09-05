const http = require('http');
const url = require('url');
const connection = require('./connection');
const { ObjectId } = require('mongodb');


const parseBody = (req) => {
    return new Promise( (resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => resolve(JSON.parse(body)));
    });
}

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

    let responseData = null;

    switch(req.method) {
        case 'POST':
            const body = await parseBody(req);
            responseData = await collection.insertOne(body);
            break;
        case 'GET':
            if( idObject ) {
                responseData = await collection.findOne({_id:ObjectId(idObject)});
            } else {
                responseData = await collection.find({}).toArray();
            }
            break;
        case 'PUT':
            if( idObject ) {
                const body = await parseBody(req);
                responseData = await collection.updateOne({_id:ObjectId(idObject)}, {'$set':body}, {upsert: true});
            } else {
                res.writeHead(400);
                responseData = {
                    error: true,
                    message: 'invalid param'
                };
            }
            break;
        case 'OPTIONS':
            responseData = true;
            break;
        default:
            res.writeHead(501);
            responseData = {
                error: true,
                message: 'invalid method'
            }
    }
    res.end(JSON.stringify(responseData));
    client.close();
});

server.listen(3000, () => console.log('start 3000'))