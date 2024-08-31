const express = require("express");
const genreRouter = express.Router();
const GenreController = require("../controllers/genreController.js");

genreRouter.route("/create").post(async (req, res) => {
  await GenreController.createGenre(req, res);
});

genreRouter.route("/update").post(async (req, res) => {
  await GenreController.updateGenre(req, res);
});

genreRouter.route("/get_by_id").get(async (req, res) => {
  await GenreController.getGenreById(req, res);
});

genreRouter.route("/get").get(async (req, res) => {
  await GenreController.getAllGenres(req, res);
});

genreRouter.route("/delete").post(async (req, res) => {
  await GenreController.deleteGenreById(req, res);
});

module.exports = genreRouter;
