const express = require("express");
const movieRouter = express.Router();
const MovieController = require("../controllers/movieController.js");

movieRouter.route("/create").post(async (req, res) => {
  await MovieController.createMovie(req, res);
});

movieRouter.route("/update").post(async (req, res) => {
  await MovieController.updateMovie(req, res);
});

movieRouter.route("/get_by_id").get(async (req, res) => {
  await MovieController.getMovieById(req, res);
});

movieRouter.route("/get").get(async (req, res) => {
  await MovieController.getAllMovies(req, res);
});

movieRouter.route("/delete").post(async (req, res) => {
  await MovieController.deleteMovieById(req, res);
});

module.exports = movieRouter;
