const express = require("express");
const movieDirectorRouter = express.Router();
const MovieDirectorController = require("../controllers/movieDirectorController.js");

movieDirectorRouter.route("/create").post(async (req, res) => {
  await MovieDirectorController.createMovieDirector(req, res);
});

movieDirectorRouter.route("/update").post(async (req, res) => {
  await MovieDirectorController.updateMovieDirector(req, res);
});

movieDirectorRouter.route("/get_by_id").get(async (req, res) => {
  await MovieDirectorController.getMovieDirectorById(req, res);
});

movieDirectorRouter.route("/get").get(async (req, res) => {
  await MovieDirectorController.getAllMovieDirectors(req, res);
});

movieDirectorRouter.route("/delete").post(async (req, res) => {
  await MovieDirectorController.deleteMovieDirectorById(req, res);
});

module.exports = movieDirectorRouter;
