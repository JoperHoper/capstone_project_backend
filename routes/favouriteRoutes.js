const express = require("express");
const favouriteRouter = express.Router();
const FavouriteController = require("../controllers/favouriteController");

favouriteRouter.route("/create").post(async (req, res) => {
  await FavouriteController.createFavourite(req, res);
});

favouriteRouter.route("/update").post(async (req, res) => {
  await FavouriteController.updateFavourite(req, res);
});

favouriteRouter.route("/get_by_id").get(async (req, res) => {
  await FavouriteController.getFavouriteById(req, res);
});

favouriteRouter.route("/get").get(async (req, res) => {
  await FavouriteController.getAllFavourites(req, res);
});

favouriteRouter.route("/delete").post(async (req, res) => {
  await FavouriteController.deleteFavouriteById(req, res);
});

module.exports = favouriteRouter;
