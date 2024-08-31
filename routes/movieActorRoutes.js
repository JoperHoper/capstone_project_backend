const express = require("express");
const movieActorRouter = express.Router();
const MovieActorController = require("../controllers/movieActorController.js");

movieActorRouter.route("/create").post(async (req, res) => {
  await MovieActorController.createMovieActor(req, res);
});

movieActorRouter.route("/update").post(async (req, res) => {
  await MovieActorController.updateMovieActor(req, res);
});

movieActorRouter.route("/get_by_id").get(async (req, res) => {
  await MovieActorController.getMovieActorById(req, res);
});

movieActorRouter.route("/get").get(async (req, res) => {
  await MovieActorController.getAllMovieActors(req, res);
});

movieActorRouter.route("/delete").post(async (req, res) => {
  await MovieActorController.deleteMovieActorById(req, res);
});

module.exports = movieActorRouter;
