const http = require('http');
const fs = require('fs/promises');
const server = http.createServer(async (req, res) => {
    const data= await fs.readFile("./index.html");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
});

server.listen(9000, (err) => {
    if (err)
        console.log(err)
    else
    console.log('Server is running at http://localhost:9000/');
});