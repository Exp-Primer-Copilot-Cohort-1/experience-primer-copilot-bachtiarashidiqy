// Create web server
// 1. Create a web server
// 2. Create a router
// 3. Create a route
// 4. Create a handler
// 5. Send a response

// 1. Create a web server
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');
const template = fs.readFileSync('./views/bbs.ejs', 'utf-8');
const posts = [];

// 2. Create a router
const server = http.createServer((req, res) => {
    const urlParsed = url.parse(req.url, true);
    if (urlParsed.pathname === '/posts') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const query = qs.parse(body);
                posts.push(query.content);
                res.writeHead(303, {
                    'Location': '/posts'
                });
                res.end();
            });
        } else {
            const content = ejs.render(template, {
                posts: posts
            });
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(content);
            res.end();
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('Not Found');
    }
}).listen(8000);
console.log('Server is running...');