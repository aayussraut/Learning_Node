const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const {User,validateUser}=require("../models/user");
const _ =require('lodash');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../middleware/auth');


router.get("/me",auth,async(req,res)=>{
    const user=await User.findById({_id:req.user._id}).select("-password");
    res.send(user);
})

router.post("/",async(req,res)=>{
    const {error}=validateUser(req.body);

    if(error){
        return res.send(error.details[0].message);
    }

    let user=await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).send("User already registered");
    }
    // user=new User({
    //     name: req.body.name,
    //     email:req.body.email,
    //     password:req.body.password,
    // })

    user=new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);

    await user.save();
    // res.send(result);

    //1st approach to show user only email and name (!password)
    // res.send({
    //     name:user.name,
    //     email:user.email
    // });


    //2nd approach
    const token=jwt.sign({_id: user._id},config.get('jwtPrivateKey')); 
    res.header('x-auth-token',token).send(_.pick(user,['name','email']));
});

module.exports=router;