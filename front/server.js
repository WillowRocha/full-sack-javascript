const { resolve } = require('path');
const { createServer } = require('http');
const { statSync, createReadStream } = require('fs');

const baseDir = resolve( __dirname , 'dist' );


const server = createServer( (req, res) => {
    console.log(req.url);
    const filename = req.url.replace(/^\//,''); 
    const filepath = resolve( baseDir , filename );
    let readStream = null;
    try {
        const stats = statSync(filepath);
        if ( stats && stats.isFile() ) {
            readStream = createReadStream( filepath );
        } else {
            readStream = createReadStream( resolve( baseDir , 'index.html' ) );
        }
        readStream
            .on('data', chunk => res.write(chunk) )
            .on('end', () => res.end() );
    } catch(err) {
        res.writeHead('404');
        res.end();
    }
    
});

server.listen(8081);