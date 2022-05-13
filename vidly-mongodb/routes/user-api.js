const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const {User,validateUser}=require("../models/user");
const _ =require('lodash');
router.get("/",async(req,res)=>{
    res.send(await User.find());
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
    res.send(_.pick(user,['name','email']));
});

module.exports=router;