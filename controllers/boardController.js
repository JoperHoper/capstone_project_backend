const BoardService = require("../services/boardService.js");
const Constants = require("../common/constants.js");
const Commons = require("../common/commons.js");

const createBoard = async (req, res) => {
  if (!Commons.authenticateToken(req, res)) {
    return;
  }
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.name) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"name" is not found in request.',
        });
        return;
      }
      // Extract and process body parameters from request
      const name = req.body.name;
      const userId = req.user?.userId;

      if (userId === undefined) {
        return;
      }

      // Call corresponding service method
      let result = await BoardService.createBoard(name, userId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Board created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add Board.",
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

const updateBoard = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.boardId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"boardId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const boardId = req.body.boardId;
      const name = req.body.name ? req.body.name : "";

      // Call corresponding service method
      let result = await BoardService.updateBoard(boardId, name);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Board (" + boardId + ") updated successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Board (" + boardId + ") not found.",
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

const getBoardById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.boardId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"boardId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const boardId = req.body.boardId;

      // Call corresponding service method
      let result = await BoardService.getBoardById(boardId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Board (" + boardId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Board (" + boardId + ") not found.",
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

const getAllBoards = async (req, res) => {
  if (!Commons.authenticateToken(req, res)) {
    return;
  }
  if (req) {
    if (req.body) {
      // Extract and process body parameters from request
      const userId = req.user?.userId;

      if (userId === undefined) {
        return;
      }

      // Call corresponding service method
      let result = await BoardService.getAllBoards(userId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Boards retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Boards not found.",
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

const deleteBoardById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.boardId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"boardId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const boardId = req.body.boardId;

      // Call corresponding service method
      let result = await BoardService.deleteBoardById(boardId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Board (" + boardId + ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Board (" + boardId + ") not found.",
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
  createBoard,
  updateBoard,
  getBoardById,
  getAllBoards,
  deleteBoardById,
};
