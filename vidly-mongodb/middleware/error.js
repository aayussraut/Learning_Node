const winston=require('winston');
module.exports=function(err,req,res,next){   //Error Middleware..to call simple pass exception in next function
    winston.error(err.message,err); //1st argument is message, 2nd is meta data
    res.status(500).send("Something failed!!!")
}