const Joi = require('joi');
const mongoose=require('mongoose');
const passwordComplexity = require("joi-password-complexity");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required:true
    }
});

const complexityOptions = {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,

  };


const User=mongoose.model("User",userSchema);

function validateUser(user){

   
    const schema=Joi.object ({
        name: Joi.string().min(5).required(),
        email:Joi.string().min(10).required().email()  ,
        password:passwordComplexity(complexityOptions).required()
    });

   return schema.validate(user)
}

module.exports.User=User;
module.exports.validateUser=validateUser;