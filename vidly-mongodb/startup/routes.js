const express=require('express');
const customer = require("../routes/customer-api");
const movie = require("../routes/movie-api");
const rental = require("../routes/rental-api");
const user = require("../routes/user-api");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const genre=require("../routes/genre");

module.exports = function (app) {

  app.use(express.json());

  app.use("/api/genres", genre);

  app.use("/api/customers", customer);
  app.use("/api/movies", movie);

  app.use("/api/rental", rental);
  app.use("/api/users", user);
  app.use("/api/auth", auth);
  app.use(error); //Error Middleware should be below all the  middleware

};
