const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userController.js");

userRouter.route("/create").post(async (req, res) => {
  await UserController.createUser(req, res);
});

userRouter.route("/update").post(async (req, res) => {
  await UserController.updateUser(req, res);
});

userRouter.route("/get_by_id").get(async (req, res) => {
  await UserController.getUserById(req, res);
});

userRouter.route("/get").get(async (req, res) => {
  await UserController.getAllUsers(req, res);
});

userRouter.route("/delete").post(async (req, res) => {
  await UserController.deleteUserById(req, res);
});

module.exports = userRouter;
