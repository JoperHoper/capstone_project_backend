const MovieGenreService = require("../services/movieGenreService.js");
const Constants = require("../common/constants.js");

const createMovieGenre = async (req, res) => {
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
      if (!req.body.genreId) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"actorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieId = req.body.movieId;
      const genreId = req.body.genreId;

      // Call corresponding service method
      let result = await MovieGenreService.createMovieGenre(movieId, genreId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieGenre created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add MovieGenre",
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

const updateMovieGenre = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieGenreId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieGenreId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieGenreId = req.body.movieGenreId;
      const movieId = req.body.movieId ? req.body.movieId : -1;
      const genreId = req.body.genreId ? req.body.genreId : -1;

      // Call corresponding service method
      let result = await MovieGenreService.updateMovieGenre(
        movieGenreId,
        movieId,
        genreId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieGenre (" + movieGenreId + ") updated successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to update Movie.",
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

const getMovieGenreById = async (req, res) => {
  if (req) {
    if (req.body || req.query) {
      // Validate request body parameters
      if (!req.body.movieGenreId && !req.query.movieGenreId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieGenreId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieGenreId = req.query?.movieGenreId
        ? parseInt(req.query.movieGenreId)
        : parseInt(req.body.movieGenreId);

      // Call corresponding service method
      let result = await MovieGenreService.getMovieGenreById(movieGenreId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieGenre (" + movieGenreId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "MovieGenre (" + movieGenreId + ") not found.",
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

const getAllMovieGenres = async (req, res) => {
  if (req) {
    if (req.body) {
      // Call corresponding service method
      let result = await MovieGenreService.getAllMovieGenres();

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieGenres retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "MovieGenres not found.",
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

const deleteMovieGenreById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieGenreId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieGenreId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieGenreId = req.body.movieGenreId;

      // Call corresponding service method
      let result = await MovieGenreService.deleteMovieGenreById(movieGenreId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "MovieGenre (" + movieGenreId + ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "MovieGenre (" + movieGenreId + ") not found.",
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
  createMovieGenre,
  updateMovieGenre,
  getMovieGenreById,
  getAllMovieGenres,
  deleteMovieGenreById,
};
