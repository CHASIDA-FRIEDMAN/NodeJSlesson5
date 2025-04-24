const http = require('http');
const PORT = 5050;

let visitors = 0;
let requests = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    visitors++;

    requests.push({ method, url, time: new Date().toISOString() });

    if (method === 'GET' && url === '/request') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ visitors, requests }));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); // תוודא שזה UTF-8 לעברית
        res.end(`ברוך הבא לאתר שלנו, הפעלת מתודת ${method} לכתובת: ${url}`);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
