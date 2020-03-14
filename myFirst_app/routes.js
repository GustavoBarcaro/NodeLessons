const fs = require("fs");

const requestHandler =  (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Enviar</button></form></body>'
            );
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            res.write('<html>');
            res.write('<head><title> My App</title></head>');
            res.write('<body><h1>Hello world </h1>');
            res.write(`<p>${message}</p>`);
            res.write('</body></html>');
            res.end();
        });
        
    }
}; 

module.exports = {
    handler: requestHandler,
    someText: "hard coded text"
};
