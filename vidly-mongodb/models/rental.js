const mongoose=require("mongoose");
var Joi=require('joi');


//joi-objectid not workling so in validateRental i just add new properties like hex() and length (24)..since objectId is a hex-value of 24 character.


// @ts-ignore
// // Joi.object = require('joi-objectid')(Joi);
// const {movieSchema}=require("./movie");
// const {customerSchema}=require("./customer");


// const rentalSchema=mongoose.Schema({
//     customer: {
//         type: customerSchema,
//         required:true
//     },
//     movie:{
//         type: movieSchema,
//         required: true
//     },
//     dateOut:{
//         type:Date,
//         required:true,
//         default:Date.now()
//     },
//     dateReturned: Date,
//     rentalFee: Number,
// });

const rentalSchema=mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required: true,
                minlength: 5,
                maxlength: 50,
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type: String,
                required: true,
                minlength:7,
                maxlength:13,
            }
         }),
         required: true,
    } ,
    movie:{
        type: new mongoose.Schema({
            title:{
                type:String,
                required: true,
                minlength:5,
                maxlength:100
            },
            dailyRentalRate:{
                type:Number,
                requird:true,
                min:0,

            }
        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now()
    },
    dateReturned: Date,
    rentalFee: Number,
});

const Rental=mongoose.model("Rental",rentalSchema);

function validateRental(rental){
    const schema=Joi.object({
        customerId: Joi.string().required().hex().length(24),
        movieId: Joi.string().required().hex().length(24)
    });
    
    return schema.validate(rental);
}

module.exports.Rental=Rental;
module.exports.validateRental=validateRental;