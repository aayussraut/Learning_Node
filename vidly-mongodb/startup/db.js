const winston=require('winston');
const mongoose=require('mongoose');


module.exports =function(){
    console.log("This is the end of the file");
    mongoose.connect('mongodb://localhost/vidly') //connection to mongodb database
    .then(() => console.log("Connected to MongoDB"));
};

