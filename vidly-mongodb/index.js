const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config=require("config");

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
// mongoose
//   .connect("mongodb://localhost/vidly") //connection to mongodb database
//   .then(() => console.log("Connected to MongoDB"));


app.listen(3000, () => {
  console.log("Listening to port 3000......");
});
