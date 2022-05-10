const express = require('express');

const app = express();

app.use(express.json());

let users = [
    {
        id: 1,
        name: "User1"
    },
    {
        id: 2,
        name: "User2"
    },
    {
        id: 3,
        name: "User3"
    }
];

//localhost:3000/
app.get('/', (req, res) => {
    res.send('Hello Bahir Dar');
});

//localhost:3000/name/name
app.get('/name/:n', (req, res) => {
    res.send(`Hello ${req.params.n}`);
});

//localhost:3000/users
app.get('/users', (req, res) => {
    res.send(users);
});

//localhost:3000/users
//app.use(express.json());
// {
//     "name": "Abebe"
// }
app.post('/users', (req, res) => {
    const u = {
        id: users.length+1,
        name: req.body.name
    }

    users.push(u);

    res.send(users);
});

//localhost:3000/users/1
app.get('/users/:id', (req, res) => {
    const usr = users.find(u => u.id === parseInt(req.params.id));

    if(usr){
        res.send(usr);
        return;
    }
    res.status(404).send("No user with this id.");
});

//PORT number = 3000
app.listen(3000, () => {
    console.log("Connected!");
})