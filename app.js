const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

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


const StudentModel = 
mongoose.model('student', studentSchema);


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

app.listen(3000, (err) => {
    if(!err){
        console.log("Server Running!");
    }
});