//Require http
const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    //Using loadash
    let num = _.random(0, 50);
    console.log(num);
    //Function run once but is called twice
    let greet = _.once(() => {
        console.log('Hello');
    });
    greet();
    greet();
    res.setHeader('Content-Type', 'text/html');
    //Basic Routes
    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;

        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data);
            res.end(data);
        }
    });
});
//Assign port for server to run
server.listen(3000, 'localhost', () => {
    console.log('Lisening to port 3000');
});