// CORE MODULES
const fs = require('fs');
const http = require('http');
const url = require('url');

// READING FILES

const tempMain = fs.readFileSync(`${__dirname}/templates/template-main.html`, 'utf-8');

// CREATING SERVER
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    
    // Main package
    if (pathname === '/' || pathname === '/main') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        
        const output = tempMain;
        res.end(output);
    
    // Page not found
    } else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h1>Page not found!</h1>');
    }
});

// Starting server
server.listen('8000', '127.0.0.1', () => {
    console.log('Listening to requests on port 8000...');
})