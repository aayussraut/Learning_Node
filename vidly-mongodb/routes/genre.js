const express = require("express");
const router = express.Router();

const { Genre, validate } = require("../models/genre");

router.get("/", async (req, res) => {
  res.send(await Genre.find());
});


router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  res.send(genre);
});


router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  let addGenre = new Genre({
    genre: req.body.genre,
  });

  addGenre = await addGenre.save();
  res.send(addGenre);
});


router.put("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("Invalid ID");
  }
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  genre.set({
    genre: req.body.genre,
  });

  const result = await genre.save();
  res.send(result);
});


router.delete("/:id", async (req, res) => {
  const genre = await Genre.deleteOne({ _id: req.params.id });
  res.send(genre);
});

module.exports = router;
