// CORE MODULES
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

// READING FILES

const tempMain = fs.readFileSync(`${__dirname}/templates/template-main.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// CREATING SERVER
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    
    // Main page
    if (pathname === '/' || pathname === '/main') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        
        const output = tempMain.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    
    // Product page  
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
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