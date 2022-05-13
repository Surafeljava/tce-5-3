const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(cors());

const schoolDB = 'mongodb://127.0.0.1/school';

mongoose.connect(schoolDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('open', ()=>{
    console.log('Database connected!')
});

//defining our schema
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    age: Number,
    grade: Number
});

const itemSchema = new Schema({
    title: String,
    desc: String,
    logo: String
});

const StudentModel = 
mongoose.model('student', studentSchema);

const ItemModel = 
mongoose.model('item', itemSchema);

//localhost:3000/students
app.get('/items', async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    let docs = await ItemModel.find({})
    .catch((err) => {
        res.json([]);
    })

    if(docs){
        console.log(docs.length);
        res.send(docs);
        return;
    }else{
        res.json([]);
    }
});

app.post('/items', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    
    let data = {
        title: req.body.title,
        desc: req.body.desc,
        logo: req.body.logo
    }

    const model = ItemModel(data);

    model.save((err) => {
        if(err){
            // res.header("Access-Control-Allow-Origin", "*");
            res.sendStatus(404);
        }
    });

    // res.header("Access-Control-Allow-Origin", "*");
    res.sendStatus(200);
});


//localhost:3000/students
app.get('/students', async (req, res) => {
    let docs = await StudentModel.find({})
    .catch((err) => {
        res.send("Error while retrieving");
    })

    if(docs){
        console.log(docs.length);
        res.send(docs);
        return;
    }else{
        res.send('There is no students registered');
    }
});

//localhost:3000/students/name
app.get('/student/:name', async (req, res) => {
    const name = req.params.name;
    console.log(name);

    let docs = await StudentModel
    .find({name: {$eq: name}}, {name:1, age:1, _id:0})
    .catch((e) => {
        console.log("Error");
    });

    if(docs.length > 0 ){
        res.send(docs);
        return;
    }else{
        res.send("No student with this name");
    }
});

//localhost:3000/students
// {
//     name: "stname",
//     age: 10,
//     grade: 6
// }
app.post('/students', (req, res) => {
    let data = {
        name: req.body.name,
        age: req.body.age,
        grade: req.body.grade
    }

    const model = StudentModel(data);

    model.save((err) => {
        if(err){
            res.send(`Error ${err}`);
        }
    });

    res.send("Sucessful");
});

app.listen(5000, (err) => {
    if(!err){
        console.log("Server Running!");
    }
});