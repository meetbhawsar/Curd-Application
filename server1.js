const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const homeRouters = require("./router/home");
const dotenv = require("dotenv");

dotenv.config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.pvy7lcu.mongodb.net/studentsdetails`,
  {
    useNewUrlParser: true,
  }
);
const port = 80;
const db = mongoose.connection;
db.on("error", () => {
  console.log("error is");
});
db.once("open", () => {
  console.log("connected");
});
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", homeRouters);

//express related things
app.use("/models", express.static("models"));
app.use(express.urlencoded());

//pug related things
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "layouts")); //set this as an template engine

app.listen(port, () => {
  console.log(`the application started successfully on port ${port}`);
});
