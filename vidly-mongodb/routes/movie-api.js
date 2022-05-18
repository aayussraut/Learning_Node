const express=require('express');
const router=express();

const {Movie,validate}=require("../models/movie");
const { Genre } = require('../models/genre');


router.get("/",async(req,res)=>{
    const movie=await Movie.find().sort('name');
    res.send(movie);

})

router.post("/",async(req,res)=>{
    const {error}=validate(req.body);

    if(error){
        return res.status(404).send(error.details[0].message);

    }

    const genre = await Genre.findById(req.body.genreId);
    if(!genre){
        return res.status(404).send("Invalid ID");
    }
    const movie=new Movie({
        title: req.body.title,
        genre:{
            _id: genre._id,
            genre: genre.genre,
            
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    const result=await movie.save();
    res.send(result);
})

module.exports=router;
