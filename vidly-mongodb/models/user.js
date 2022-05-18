const Joi = require('joi');
const mongoose=require('mongoose');
const passwordComplexity = require("joi-password-complexity");
const jwt=require('jsonwebtoken');
const config=require('config');

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
    },
    isAdmin:Boolean
});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id: this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}



const User=mongoose.model("User",userSchema);

function validateUser(user){

   
    const schema=Joi.object ({
        name: Joi.string().min(5).required(),
        email:Joi.string().min(10).required().email()  ,
        password:passwordComplexity().required()
    });

   return schema.validate(user)
}

module.exports.User=User;
module.exports.validateUser=validateUser;