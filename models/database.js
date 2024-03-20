// const mongoose =require('mongoose');
// mongoose.connect("mongodb://localhost/curd");

// const db = mongoose.model('db',{name:String});
// const ab = new db({name:'mitali'});
// ab.save().then(()=>console.log("connection successful"))
// .catch((err)=>console.log(err));

const mongoose =require('mongoose');
const Schema = mongoose.Schema;
let clubSchema = new Schema({
    name: String,
    email:String,
    mobile:String,
    city:String,
});

var Color = mongoose.model('student',clubSchema);
module.exports = Color;
// module.exports = mongoose.model('student',clubSchema)