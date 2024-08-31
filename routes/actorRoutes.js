const express = require("express");
const actorRouter = express.Router();
const ActorController = require("../controllers/actorController.js");

actorRouter.route("/create").post(async (req, res) => {
  await ActorController.createActor(req, res);
});

actorRouter.route("/update").post(async (req, res) => {
  await ActorController.updateActor(req, res);
});

actorRouter.route("/get_by_id").get(async (req, res) => {
  await ActorController.getActorById(req, res);
});

actorRouter.route("/get").get(async (req, res) => {
  await ActorController.getAllActors(req, res);
});

actorRouter.route("/delete").post(async (req, res) => {
  await ActorController.deleteActorById(req, res);
});

module.exports = actorRouter;
