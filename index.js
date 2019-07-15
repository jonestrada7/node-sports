// CORE MODULES
const fs = require('fs');
const http = require('http');
const url = require('url');

// CREATING SERVER
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    
    // Main package
    if (pathname === '/' || pathname === '/main') {
        res.end('This is the MAIN');
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h1>Page not found!</h1>');
    }
});

// Starting server
server.listen('8000', '127.0.0.1', () => {
    console.log('Listening to requests on port 800...');
})