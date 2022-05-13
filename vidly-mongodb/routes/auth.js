const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const {User}=require("../models/user");
const _ =require('lodash');
const Joi= require('joi');
const jwt=require('jsonwebtoken');

router.post("/",async(req,res)=>{
    const {error}=validate(req.body);
    if(error){
        return res.send(error.details[0].message);
    }

    let user=await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send("Invalid email or password.");
    }



    const validPassword =await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.status(400).send("Invalid email or password.");
    }
    const token=jwt.sign({_id:user._id},"privateKey"); ///where private key is private key
    res.send(token);
});

function validate(req){

   
    const schema=Joi.object ({
        email:Joi.string().min(10).required().email()  ,
        password:Joi.string().required()
    });

   return schema.validate(req)
}

module.exports=router;