const express=require("express")
const router=express.Router();
// const Fawn = require("fawn");

const {Rental,validateRental}=require("../models/rental");
const {Customer}=require("../models/customer");
const { Movie } = require("../models/movie");
const { mongo, default: mongoose } = require("mongoose");
// const mongoose = require("mongoose");

// Fawn.init(mongoose);

router.get("/",async (req,res)=>{
    res.send(await Rental.find())
});

router.post("/",async(req,res)=>{
    const {error}=validateRental(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const movie=await Movie.findById(req.body.movieId);
    if(!movie){
        return res.status(400).send("Moivie Not Found!!!");
    }
    //  --bad validation 
    // if(!mongoose.Types.ObjectId.isValid(req.body.customerId)){
    //     return res.status(400).send("Invalid Customer");
    // }

    const customer=await Customer.findById(req.body.customerId);
    if(!customer){
        return res.status(400).send("Customer Not Found!!!");
    };

    if (movie.numberInStock === 0){
        return res.status(400).send("Movie Not In Stockkk");
    }

    const rental=new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone: customer.phone
        },
        movie:{
            _id:movie._id,
            title: movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    })

    // try{
    //     new Fawn.Task()
    // .save("rentals",rental)
    // .update('movies',{_id: movie._id},{
    //     $inc: {numberInStock: -1}
    // })
    // .run();
    // }
    // catch(err){
    //     res.status(500).send('Something failed');
    // }
    const result=await rental.save();

    movie.numberInStock--;
    const result2=movie.save();
    res.send(result+result2);

})

module.exports=router;