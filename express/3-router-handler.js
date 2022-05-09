
const express = require('express')
const app = express();
const Joi = require('joi');
const logger=require("./routes/middleware/logger");
const courses=require("./routes/courses");
const home=require("./routes/home")

app.use(express.json()); //adding a piece of middleware //parsing of json object
app.use(express.urlencoded({extended:true})); //parse incoming req with urlencoded  payloads
app.use(express.static('public')); //serves static assets such as html css files
app.use(function (req, res, next) {
    console.log("Logging....");
    next();
}); 
app.use(logger.log);


app.use("/api/courses",courses); //for any routes with /api/courses use courses router
app.use("/",home);

app.set('view engine','pug'); //return html use view engine like pug
app.set('views','./views');





const port = 8080; //environment variable
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});





// app.post();
// app.put();
// app.delete();
