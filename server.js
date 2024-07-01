// require('./models/database');
const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
// const expressHandlerbars =require('express-handlebars');
const app = express();
const router =express.Router();
const mongoose= require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/curd');
const port = 80;

//mongoose schema
const curdop = new mongoose.Schema({
    fname:String,
    email:String,
    mobile:String,
    city:String
});

const curdapi = mongoose.model('curdapi',curdop)

//configure middleware
app.use(bodyParser.urlencoded({
    extended:true
}));

//for user interface
// app.use(bodyParser.json());
//it will converting all the request data to json formate.

app.use('/models',express.static('models'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'/layouts'));

// app.engine('hbs',expressHandlerbars({
//     extname:'hbs',
//     defaultLayout: 'mainLayout',
//     layoutsDir:__dirname + '/views/layouts/'
// }))

// app.set('view engine','hbs');

// configuring the route for home route
// app.get("/",(req,res)=>{
//     res.send("hello world");
// })

// router.post('/',(req,res)=>{
//     //creating a custo function
//     insertRecord(req,res);
// })
// function insertRecord(req,res){
//     var employee = new curdapi();
//     employee.fname=req.body.fname;
//     employee.email=req.body.email;
//     employee.mobile=req.body.mobile;
//     employee.city=req.body.city;
//     employee.save((err,doc)=>{
//         //if no error is there
//         if(!err)
//         {
//             res.redirect('employee/list');
//         }
//         else{
//             console.log("error"+ err);
//         }
//     })
// }
//endpoints
app.get('/',(req,res)=>{
    const pro={}
    res.status(200).render('Form.pug',pro);
});
app.post('/', (req, res)=>{
    var mydata = new curdapi(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
});
app.listen(port,()=>{
    console.log(`server is working on port : ${port}`)
});