const express = require("express");
// const Color = require('../models/database');
const Router = express.Router();
const database = require("../models/database");
// const multer = require("multer");

Router.get("/", (err, res) => {
  res.render("Form");
});

Router.post("/curd", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const city = req.body.city;
  // const upload = req.file.filename;

  console.log(name, email, mobile, city);
  const Database = new database({
    name,
    email,
    mobile,
    city,
  });
  Database.save((err) => {
    if (err) {
      console.log("error is");
    } else {
      res.redirect("/");
    }
  });
});

//find data
Router.get("/viewall", (req, res) => {
  database.find((err, docs) => {
    if (err) throw err;
    // console.log(docs);
    res.render("viewall", {
      students: docs,
    });
  });
});

// update data
Router.get("/edit/:id", (req, res) => {
  console.log(req.params.id);
  database.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        console.log("cant update");
      } else {
        res.render("edit", { studentdata: docs });
      }
    }
  );
});

Router.post("/edit/:id", (req, res) => {
  console.log(req.params.id);
  database.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {
    if (err) {
      console.log("cant update");
    } else {
      res.redirect("/viewall");
    }
  });
});

//delete data
Router.get("/delete/:id", (req, res) => {
  database.findByIdAndDelete({ _id: req.params.id }, req.body, (err, docs) => {
    if (err) {
      console.log("err is");
    } else {
      console.log("Deleted");
      res.redirect("/viewall");
    }
  });
});
module.exports = Router;
