const FavouriteService = require("../services/favouriteService.js");
const Constants = require("../common/constants.js");
const Commons = require("../common/commons.js");

const createFavourite = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.userId) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"userId" is not found in request.',
        });
        return;
      }
      if (!req.body.movieId) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"movieId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const userId = req.body.userId;
      const movieId = req.body.movieId;

      // Call corresponding service method
      let result = await FavouriteService.createFavourite(userId, movieId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Favourite created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add Faviourite.",
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

const updateFavourite = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.favouriteId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"favouriteId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const favouriteId = req.body.favouriteId;
      const userId = req.body.userId ? req.body.userId : -1;
      const movieId = req.body.movieId ? req.body.movieId : -1;

      // Call corresponding service method
      let result = await FavouriteService.updateFavourite(
        favouriteId,
        userId,
        movieId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Favourite (" + favouriteId + ") updated successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to update Favourite.",
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

const getFavouriteById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.favouriteId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"favouriteId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const favouriteId = req.body.favouriteId;

      // Call corresponding service method
      let result = await FavouriteService.getFavouriteById(favouriteId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Favourite (" + favouriteId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Favourite (" + favouriteId + ") not found.",
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

const getAllFavourites = async (req, res) => {
  if (req) {
    if (req.body) {
      // Call corresponding service method
      let result = await FavouriteService.getAllFavourites();

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Favourites retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Favourites not found.",
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

const deleteFavouriteById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.favouriteId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"favouriteId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const favouriteId = req.body.favouriteId;

      // Call corresponding service method
      let result = await FavouriteService.deleteFavouriteById(favouriteId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "Favourite (" + favouriteId + ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Favourite (" + favouriteId + ") not found.",
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
  createFavourite,
  updateFavourite,
  getFavouriteById,
  getAllFavourites,
  deleteFavouriteById,
};
