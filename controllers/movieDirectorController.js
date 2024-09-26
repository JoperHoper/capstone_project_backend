const MovieDirectorService = require("../services/movieDirectorService.js");
const Constants = require("../common/constants.js");

const createMovieDirector = async (req, res) => {
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
      if (!req.body.directorId) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"actorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieId = req.body.movieId;
      const directorId = req.body.directorId;

      // Call corresponding service method
      let result = await MovieDirectorService.createMovieDirector(
        movieId,
        directorId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieDirector created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add MovieDirector",
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

const updateMovieDirector = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieDirectorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieDirectorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieDirectorId = req.body.movieDirectorId;
      const movieId = req.body.movieId ? req.body.movieId : -1;
      const directorId = req.body.directorId ? req.body.directorId : -1;

      // Call corresponding service method
      let result = await MovieDirectorService.updateMovieDirector(
        movieDirectorId,
        movieId,
        directorId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "MovieDirector (" + movieDirectorId + ") updated successfully.",
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

const getMovieDirectorById = async (req, res) => {
  if (req) {
    if (req.body || req.query) {
      // Validate request body parameters
      if (!req.body.movieDirectorId && !req.query.movieDirectorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieDirectorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieDirectorId = req.query?.movieDirectorId
        ? parseInt(req.query.movieDirectorId)
        : parseInt(req.body.movieDirectorId);

      // Call corresponding service method
      let result = await MovieDirectorService.getMovieDirectorById(
        movieDirectorId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "MovieDirector (" + movieDirectorId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "MovieDirector (" + movieDirectorId + ") not found.",
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

const getAllMovieDirectors = async (req, res) => {
  if (req) {
    if (req.body) {
      // Extract and process body parameters from request
      const name = req.body.name ? req.body.name : "";

      // Call corresponding service method
      let result = await MovieDirectorService.getAllMovieDirectors(name);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieDirectors retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "MovieDirectors not found.",
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

const deleteMovieDirectorById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieDirectorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieDirectorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieDirectorId = req.body.movieDirectorId;

      // Call corresponding service method
      let result = await MovieDirectorService.deleteMovieDirectorById(
        movieDirectorId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "MovieDirector (" +
            movieDirectorId +
            ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "MovieDirector (" + movieDirectorId + ") not found.",
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
  createMovieDirector,
  updateMovieDirector,
  getMovieDirectorById,
  getAllMovieDirectors,
  deleteMovieDirectorById,
};
