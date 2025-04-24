const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if(method === 'GET' && url === '/cards'){
        res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});
        res.end('הכרטיסים נטענו בהצלחה');
    }

    else if (method === 'GET' && url === '/checks'){
        res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
        res.end(JSON.stringify({message:'הכרטיסים נבדקו בהצלחה'}));
    }

    else if(method === 'GET' && url === '/sales'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.end(`
            <html>
            <head><title>מבצעים</title></head>
            <body>
            <h1>מבצעים חמים</h1>
            <p>כל החולצות ב50% הנחה!</p>
            </body>
            </html>
        `);
    }

    else if(method === 'GET' && url === '/page'){
        const filePath = path.join(__dirname, 'page.html');
        fs.readFile(filePath, (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end('שגיאה בטעינת הדף');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        });
    }

    else if(method === 'GET' && url === '/'){
        const imagePath = path.join(__dirname, 'image.jpg');
        fs.readFile(imagePath, (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end('שגיאה בטעינת התמונה');
                return;
            }
            res.writeHead(200, {'Content-Type': 'image/jpeg'});
            res.end(data);
        });
    }

    else{
        res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('הדף לא נמצא');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);

