
const express = require('express')
const app = express();
const logger=require("./routes/middleware/logger");
const config=require('config');
const startupDebugger=require('debug')('app:startup'); //namepace : app:startup
const dbDebugger=require('debug')('app:db')

//config : To  store configuration setting for our application
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);

console.log(`Mail password: ${config.get('mail.password')}`);

//Environment
// console.log(`Node_Env: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get("env")}`); 

app.use(express.json()); //adding a piece of middleware //parsing of json object
app.use(express.urlencoded({extended:true})); //parse incoming req with urlencoded  payloads
app.use(express.static('public')); //serves static assets such as html css files
app.use(function (req, res, next) {
    console.log("Logging....");
    next();
}); 
app.use(logger.log);


if(app.get('env')==='development'){
    startupDebugger('Started ....')
}
 // Db work...
 dbDebugger("Connected to the database...");

const port = 8080; //environment variable
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
