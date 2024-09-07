const express = require("express");
const boardFavouritesRouter = express.Router();
const BoardFavouriteController = require("../controllers/boardFavouriteController.js");

boardFavouritesRouter.route("/create").post(async (req, res) => {
  await BoardFavouriteController.createBoardFavourite(req, res);
});

boardFavouritesRouter.route("/update").post(async (req, res) => {
  await BoardFavouriteController.updateBoardFavourite(req, res);
});

boardFavouritesRouter.route("/get_by_id").get(async (req, res) => {
  await BoardFavouriteController.getBoardFavouriteById(req, res);
});

boardFavouritesRouter.route("/get").get(async (req, res) => {
  await BoardFavouriteController.getAllBoardFavourites(req, res);
});

boardFavouritesRouter.route("/delete").post(async (req, res) => {
  await BoardFavouriteController.deleteBoardFavouriteById(req, res);
});

module.exports = boardFavouritesRouter;
