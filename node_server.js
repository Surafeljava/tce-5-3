const http = require('http');

//http://127.0.0.1:3000/
//http://127.0.0.1:3000/courses

const server = http.createServer(
    (req, res) => {

        if(req.url === '/') {
            res.write('Hello Bahir Dar');
            res.end();
        }

        if(req.url === '/courses'){
            res.write('Courses List');
            res.end();
        }

    }
);

server.listen(3000);