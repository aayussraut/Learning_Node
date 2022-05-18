const Joi = require("joi");
const mongoose = require("mongoose");

const genresSchema = mongoose.Schema({
  genre: String,
});

const Genre = mongoose.model("Genre", genresSchema);


function validateGenre(genre) {
  const schema = Joi.object({
    genre: Joi.string().required().min(3),
  });

  return schema.validate(genre);
}
module.exports.genreSchema=genresSchema;
module.exports.Genre=Genre;
module.exports.validate=validateGenre;