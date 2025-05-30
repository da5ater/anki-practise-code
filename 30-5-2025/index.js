const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!\n');
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page\n');
    }
});

server.on('connection', (socket) => {
    console.log('New connection established');
    socket.on('close', () => {
        console.log('Connection closed');
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
