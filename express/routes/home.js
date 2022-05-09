const express=require('express');
const router=express.Router();

router.get("/", (req, res) => {
    res.render('index',{title:"My express app", message:"Hello world"}) //index=index.pug

});


module.exports=router;