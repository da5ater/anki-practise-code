const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/courses') {
        res.write(JSON.stringify([1, 2, 3])); // an array of object is returned 
        res.end();
    }
}); // this server is an event emitter



server.listen(3000); // start listening for connections

console.log('Listening on port 3000...'); // we are listening for connections , on port 3000 