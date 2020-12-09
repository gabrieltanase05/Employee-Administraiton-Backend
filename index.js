// Imports
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import Data from './models/Employee.js';
import 'dotenv/config.js';

// App config
const app = express();
const router = express.Router();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use('/api', router);

//Listening Server on ENV PORT ( as Heroku wants) or 8080
app.listen(process.env.PORT || 8080);

//Connect to db.mongo
mongoose.connect(
    process.env.DB_CONNECTION,
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },

    ()=> console.log('Connection to db!')

);

//Check the connection to db.mongo
mongoose.connection.on('error', console.error.bind(console, 'Error connection to MongoDB'))

//Root page
app.get('/',(req, res)=>{ 
    res.status(200).send("Welcome to Employee Administration backend")
      
});

//API Routes(GET, POST, UPDATE, DELETE)
//GET Method
router.get('/GET',(req, res)=>{
        Data.find((err, data)=>{
            if(err) {
                res.status(500).json({success: false, error: err});
            } else {
                res.status(200).json({success: true, data: data});
            }
        });

});

//POST Method- ADD new data to Mongo.db
router.post('/POST', (req, res) => {
    const data = new Data();
    const {name, salary, age} = req.body

    data.name = name;
    data.salary = salary;
    data.age = age;
    data.save((err) => {
        if (err){
            res.status(500).json({success: false, error: err});
        } else {
            res.status(201).json({success: true});
        }

    });
})

//DELETE Method- DELETE data from  Mongo.db
router.delete('/DELETE', (req, res)=>{
    const {id} = req.body;
    Data.findByIdAndRemove(id, err =>{
        if (err){
            res.status(500).json({success: false, error: err});
        } else {
            res.status(200).json({ success: true });
        }

    })
})

//UPDATE Method- UPDATE data from  Mongo.db
router.post('/UPDATE', (req, res)=>{
    const{id, name, salary, age} = req.body;
    Data.findByIdAndUpdate(id,{$set:{name: name, salary: salary, age: age}}, (err)=>{
        if (err){
            res.status(500).json({success: false, error: err});
        } else {
            res.status(500).json({success: true});
        }
    })
})


