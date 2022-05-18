const mongoose = require("mongoose");

const Joi = require("joi");
const { genreSchema } = require("./genre");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
  },
});

const Movie=mongoose.model("movie",movieSchema);


function validateMovie(movie){
    const schema=Joi.object({
        title:Joi.string().min(5).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    });


    return schema.validate(movie);
}
module.exports.movieSchema=movieSchema;
module.exports.Movie=Movie;
module.exports.validate=validateMovie;
