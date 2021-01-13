const express = require('express');
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.NODE_PORT || 80;
const MONGODB_URL = process.env.MONGODB_URL;

console.log("MONGODB_URL")
console.log(MONGODB_URL)

const Person = mongoose.model("Person", {
  "name": String,
  "email": String,
  "age": Number,
  "admin": Boolean
});

const app = express();
app.use(bodyparser.json());

app.get('/', function (req, res) {
  console.log('here ....');
  Person.find({}, function (err, persons) {
    res.json(persons);
  });
});

app.post('/', function (req, res) {
  const p = new Person(req.body);
  p.save(function (err, persons) {
    res.json(persons);
  });
});

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to mongodb');
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  });
}).catch(() => {
  console.error('Failed to connect to mongodb');
});
