const FavouriteService = require("../services/favouriteService.js");
const Constants = require("../common/constants.js");
const Commons = require("../common/commons.js");

const createFavourite = async (req, res) => {
  let isAccessGranted = await Commons.authenticateToken(req, res);
  if (!isAccessGranted) {
    return;
  }
  if (req) {
    if (req.body) {
      if (!req.body.movieId) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"movieId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const userId = req.user?.userId;
      const movieId = req.body.movieId;

      if (userId === undefined) {
        return;
      }

      let checkExistingFavourite = await FavouriteService.getAllFavourites(
        userId,
        movieId
      );
      if (checkExistingFavourite) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "User (" +
            userId +
            ") has already favourite movie (" +
            movieId +
            ").",
          data: checkExistingFavourite,
        });
        return;
      }

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
    if (req.body || req.query) {
      // Validate request body parameters
      if (!req.body.favouriteId && !req.query.favouriteId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"favouriteId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const favouriteId = req.query?.favouriteId
        ? parseInt(req.query.favouriteId)
        : parseInt(req.body.favouriteId);

      console.log("favouriteId: " + favouriteId);

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
  let isAccessGranted = await Commons.authenticateToken(req, res);
  if (!isAccessGranted) {
    return;
  }
  if (req) {
    if (req.body) {
      // Extract and process body parameters from request
      const favouriteId = req.body.favouriteId ? req.body.favouriteId : -1;
      const userId = req.user?.userId;
      const movieId = req.body.movieId ? req.body.movieId : -1;
      const favouriteIds = req.body.favouriteIds ? req.body.favouriteIds : "";
      let favouriteIdArray = [];
      if (favouriteIds != "") {
        const favouriteIdStrArray = favouriteIds.split(",");
        if (favouriteIdStrArray.length > 0) {
          for (let i = 0; i < favouriteIdStrArray.length; i++) {
            let parsedFavouriteId = parseInt(favouriteIdStrArray[i]);
            favouriteIdArray.push(parsedFavouriteId);
          }
        }
      }

      // Call corresponding service method
      let result = await FavouriteService.getAllFavourites(
        favouriteId,
        userId,
        movieId,
        favouriteIdArray
      );

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

const deleteFavouriteByUserAndMovieId = async (req, res) => {
  let isAccessGranted = await Commons.authenticateToken(req, res);
  if (!isAccessGranted) {
    return;
  }
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieId) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"movieId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const userId = req.user?.userId;
      const movieId = req.body.movieId;

      // Call corresponding service method
      let result = await FavouriteService.deleteFavouriteByUserAndMovieId(
        userId,
        movieId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "Favourite (" +
            result.favouriteId +
            ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message:
            "Favourite movie (" +
            movieId +
            ") of user (" +
            userId +
            ") not found.",
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
  deleteFavouriteByUserAndMovieId,
};
