const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let clubSchema = new Schema({
  name: String,
  email: String,
  mobile: String,
  city: String,
});

var Color = mongoose.model("student", clubSchema);
module.exports = Color;
