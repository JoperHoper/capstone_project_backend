const BoardFavouriteService = require("../services/boardFavouriteService.js");
const Constants = require("../common/constants.js");

const createBoardFavourite = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.boardId) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"boardId" is not found in request.',
        });
        return;
      }
      if (!req.body.favouriteId) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"favouriteId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const boardId = req.body.boardId;
      const favouriteId = req.body.favouriteId;

      // Call corresponding service method
      let result = await BoardFavouriteService.createBoardFavourite(
        boardId,
        favouriteId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "BoardFavourite created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add BoardFavourite",
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

const updateBoardFavourite = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.boardFavouriteId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"boardFavouriteId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const boardFavouriteId = req.body.boardFavouriteId;
      const boardId = req.body.boardId ? req.body.boardId : -1;
      const favouriteId = req.body.favouriteId ? req.body.favouriteId : -1;

      // Call corresponding service method
      let result = await BoardFavouriteService.updateBoardFavourite(
        boardFavouriteId,
        boardId,
        favouriteId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "BoardFavourite (" + boardFavouriteId + ") updated successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to update BoardFavourite.",
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

const getBoardFavouriteById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.boardFavouriteId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"boardFavouriteId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const boardFavouriteId = req.body.boardFavouriteId;

      // Call corresponding service method
      let result = await BoardFavouriteService.getBoardFavouriteById(
        boardFavouriteId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "BoardFavourite (" + boardFavouriteId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "BoardFavourite (" + boardFavouriteId + ") not found.",
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

const getAllBoardFavourites = async (req, res) => {
  if (req) {
    if (req.body) {
      // Extract and process body parameters from request
      const boardId = req.body.boardId ? req.body.boardId : -1;
      const favouriteId = req.body.favouriteId ? req.body.favouriteId : -1;

      // Call corresponding service method
      let result = await BoardFavouriteService.getAllBoardFavourites(
        boardId,
        favouriteId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "BoardFavourites retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "BoardFavourites not found.",
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

const deleteBoardFavouriteById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.boardFavouriteId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"boardFavouriteId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const boardFavouriteId = req.body.boardFavouriteId;

      // Call corresponding service method
      let result = await BoardFavouriteService.deleteBoardFavouriteById(
        boardFavouriteId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "BoardFavourite (" +
            boardFavouriteId +
            ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "BoardFavourite (" + boardFavouriteId + ") not found.",
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
  createBoardFavourite,
  updateBoardFavourite,
  getBoardFavouriteById,
  getAllBoardFavourites,
  deleteBoardFavouriteById,
};
