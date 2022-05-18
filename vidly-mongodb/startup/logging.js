
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {


  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
  );
};
