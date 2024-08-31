const express = require("express");
const movieGenreRouter = express.Router();
const MovieGenreController = require("../controllers/movieGenreController.js");

movieGenreRouter.route("/create").post(async (req, res) => {
  await MovieGenreController.createMovieGenre(req, res);
});

movieGenreRouter.route("/update").post(async (req, res) => {
  await MovieGenreController.updateMovieGenre(req, res);
});

movieGenreRouter.route("/get_by_id").get(async (req, res) => {
  await MovieGenreController.getMovieGenreById(req, res);
});

movieGenreRouter.route("/get").get(async (req, res) => {
  await MovieGenreController.getAllMovieGenres(req, res);
});

movieGenreRouter.route("/delete").post(async (req, res) => {
  await MovieGenreController.deleteMovieGenreById(req, res);
});

module.exports = movieGenreRouter;
