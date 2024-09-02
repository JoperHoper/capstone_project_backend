const UserService = require("../services/userService.js");
const Constants = require("../common/constants.js");

const createUser = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.firstName) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"firstName" is not found in request.',
        });
        return;
      }
      if (!req.body.lastName) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"lastName" is not found in request.',
        });
        return;
      }
      if (!req.body.username) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"username" is not found in request.',
        });
        return;
      }
      if (!req.body.email) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"email" is not found in request.',
        });
        return;
      }
      if (!req.body.password) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"password" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      // Call corresponding service method
      let result = await UserService.createUser(
        firstName,
        lastName,
        username,
        email,
        password
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "User created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add User.",
        });
        return;
      }
    } else {
      res.status(200).send({
        status: Constants.FAILED,
        message: "Unable to get request body.",
      });
      return;
    }
  } else {
    res.status(400).send({
      status: Constants.FAILED,
      message: "Request is invalid. Please try again.",
    });
    return;
  }
};

const login = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.username) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"username" is not found in request.',
        });
        return;
      }
      if (!req.body.password) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"password" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const username = req.body.username;
      const password = req.body.password;

      // Call corresponding service method
      let result = await UserService.login(username, password);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Log in successful.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to login.",
        });
        return;
      }
    } else {
      res.status(200).send({
        status: Constants.FAILED,
        message: "Unable to get request body.",
      });
      return;
    }
  } else {
    res.status(400).send({
      status: Constants.FAILED,
      message: "Request is invalid. Please try again.",
    });
    return;
  }
};

const updateUser = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.userId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"userId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const userId = req.body.userId;
      const firstName = req.body.firstName ? req.body.firstName : "";
      const lastName = req.body.lastName ? req.body.lastName : "";
      const username = req.body.username ? req.body.username : "";
      const email = req.body.email ? req.body.email : "";
      const password = req.body.password ? req.body.password : "";

      // Call corresponding service method
      let result = await UserService.updateUser(
        userId,
        firstName,
        lastName,
        username,
        email,
        password
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "User (" + userId + ") updated successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "User (" + userId + ") not found.",
        });
        return;
      }
    } else {
      res.status(200).send({
        status: Constants.FAILED,
        message: "Unable to get request body.",
      });
      return;
    }
  } else {
    res.status(400).send({
      status: Constants.FAILED,
      message: "Request is invalid. Please try again.",
    });
    return;
  }
};

const getUserById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.userId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"userId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const userId = req.body.userId;

      // Call corresponding service method
      let result = await UserService.getUserById(userId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "User (" + userId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "User (" + userId + ") not found.",
        });
        return;
      }
    } else {
      res.status(200).send({
        status: Constants.FAILED,
        message: "Unable to get request body.",
      });
      return;
    }
  } else {
    res.status(400).send({
      status: Constants.FAILED,
      message: "Request is invalid. Please try again.",
    });
    return;
  }
};

const getAllUsers = async (req, res) => {
  if (req) {
    if (req.body) {
      // Call corresponding service method
      let result = await UserService.getAllUsers();

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Users retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Users not found.",
        });
        return;
      }
    } else {
      res.status(200).send({
        status: Constants.FAILED,
        message: "Unable to get request body.",
      });
      return;
    }
  } else {
    res.status(400).send({
      status: Constants.FAILED,
      message: "Request is invalid. Please try again.",
    });
    return;
  }
};

const deleteUserById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.userId) {
        res.status(200).send({
          status: Constants.ERROR,
          message: '"userId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const userId = req.body.userId;

      // Call corresponding service method
      let result = await UserService.deleteUserById(userId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "User (" + userId + ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "User (" + userId + ") not found.",
        });
        return;
      }
    } else {
      res.status(200).send({
        status: Constants.FAILED,
        message: "Unable to get request body.",
      });
      return;
    }
  } else {
    res.status(400).send({
      status: Constants.FAILED,
      message: "Request is invalid. Please try again.",
    });
    return;
  }
};

module.exports = {
  createUser,
  login,
  updateUser,
  getUserById,
  getAllUsers,
  deleteUserById,
};
