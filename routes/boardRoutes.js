const express = require("express");
const boardRouter = express.Router();
const BoardController = require("../controllers/boardController.js");

boardRouter.route("/create").post(async (req, res) => {
  await BoardController.createBoard(req, res);
});

boardRouter.route("/update").post(async (req, res) => {
  await BoardController.updateBoard(req, res);
});

boardRouter.route("/get_by_id").get(async (req, res) => {
  await BoardController.getBoardById(req, res);
});

boardRouter.route("/get").get(async (req, res) => {
  await BoardController.getAllBoards(req, res);
});

boardRouter.route("/delete").post(async (req, res) => {
  await BoardController.deleteBoardById(req, res);
});

module.exports = boardRouter;
