const express = require("express");
const directorRouter = express.Router();
const DirectorController = require("../controllers/directorController.js");

directorRouter.route("/create").post(async (req, res) => {
  await DirectorController.createDirector(req, res);
});

directorRouter.route("/update").post(async (req, res) => {
  await DirectorController.updateDirector(req, res);
});

directorRouter.route("/get_by_id").get(async (req, res) => {
  await DirectorController.getDirectorById(req, res);
});

directorRouter.route("/get").get(async (req, res) => {
  await DirectorController.getAllDirectors(req, res);
});

directorRouter.route("/delete").post(async (req, res) => {
  await DirectorController.deleteDirectorById(req, res);
});

module.exports = directorRouter;
