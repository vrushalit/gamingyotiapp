const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Serve the redirect HTML page
    if (req.url === '/result' || req.url.startsWith('/result?')) {
        const htmlPath = path.join(__dirname, 'public-redirect.html');
        
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading redirect page');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 3003;
server.listen(PORT, () => {
    console.log(`🔄 Public redirect server running on http://localhost:${PORT}`);
    console.log(`📄 Redirect page: http://localhost:${PORT}/result`);
    console.log(`🔗 This will redirect users to: http://localhost:3000/result?sessionId=YOUR_SESSION_ID`);
    console.log(`\n📋 For Yoti callback, use: http://localhost:${PORT}/result`);
});
