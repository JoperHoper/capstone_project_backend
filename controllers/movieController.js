const MovieService = require("../services/movieService.js");
const Constants = require("../common/constants.js");
const Commons = require("../common/commons.js");

const createMovie = async (req, res) => {
  let isAccessGranted = await Commons.authenticateToken(req, res);
  if (!isAccessGranted) {
    return;
  }
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieTitle) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"movieTitle" is not found in request.',
        });
        return;
      }
      if (!req.body.language) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"language" is not found in request.',
        });
        return;
      }
      if (!req.body.synopsis) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"synopsis" is not found in request.',
        });
        return;
      }
      if (!req.body.posterUrl) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"posterUrl" is not found in request.',
        });
        return;
      }
      if (!req.body.trailerUrl) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"trailerUrl" is not found in request.',
        });
        return;
      }
      if (!req.body.runningTime) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"runningTime" is not found in request.',
        });
        return;
      }
      if (!req.body.releaseDate) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"releaseDate" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieTitle = req.body.movieTitle;
      const language = req.body.language;
      const synopsis = req.body.synopsis;
      const posterUrl = req.body.posterUrl;
      const trailerUrl = req.body.trailerUrl;
      const runningTime = req.body.runningTime;
      const releaseDate = new Date(req.body.releaseDate);
      if (!Commons.isDate(releaseDate)) {
        res.status(400).send({
          status: Constants.FAILED,
          message:
            '"releaseDate" (' + req.body.releaseDate + ") format is invalid.",
        });
        return;
      }

      // Call corresponding service method
      let result = await MovieService.createMovie(
        movieTitle,
        language,
        synopsis,
        posterUrl,
        trailerUrl,
        runningTime,
        releaseDate
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Movie created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add Movie.",
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

const updateMovie = async (req, res) => {
  let isAccessGranted = await Commons.authenticateToken(req, res);
  if (!isAccessGranted) {
    return;
  }
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieId = req.body.movieId;
      const movieTitle = req.body.movieTitle ? req.body.movieTitle : "";
      const language = req.body.language ? req.body.language : "";
      const synopsis = req.body.synopsis ? req.body.synopsis : "";
      const posterUrl = req.body.posterUrl ? req.body.posterUrl : "";
      const trailerUrl = req.body.trailerUrl ? req.body.trailerUrl : "";
      const runningTime = req.body.runningTime ? req.body.runningTime : -1;
      let releaseDate = null;
      if (req.body.releaseDate) {
        releaseDate = new Date(req.body.releaseDate);
        if (!Commons.isDate(releaseDate)) {
          res.status(400).send({
            status: Constants.FAILED,
            message:
              '"releaseDate" (' + req.body.releaseDate + ") format is invalid.",
          });
          return;
        }
      }

      // Call corresponding service method
      let result = await MovieService.updateMovie(
        movieId,
        movieTitle,
        language,
        synopsis,
        posterUrl,
        trailerUrl,
        runningTime,
        releaseDate
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Movie (" + movieId + ") updated successfully.",
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

const getMovieById = async (req, res) => {
  if (req) {
    if (req.body || req.query) {
      // Validate request body parameters
      if (!req.body.movieId && !req.query.movieId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieId = req.query?.movieId
        ? parseInt(req.query.movieId)
        : parseInt(req.body.movieId);

      // Call corresponding service method
      let result = await MovieService.getMovieById(movieId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Movie (" + movieId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Movie (" + movieId + ") not found.",
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

const getAllMovies = async (req, res) => {
  if (req) {
    if (req.body) {
      // Extract and process body parameters from request
      const movieTitle = req.body.movieTitle ? req.body.movieTitle : "";
      const language = req.body.language ? req.body.language : "";
      const fromRunningTime = req.body.fromRunningTime
        ? req.body.fromRunningTime
        : -1;
      const toRunningTime = req.body.toRunningTime
        ? req.body.toRunningTime
        : -1;
      let fromReleaseDate = null;
      if (req.body.fromReleaseDate) {
        fromReleaseDate = new Date(req.body.fromReleaseDate);
        if (!Commons.isDate(fromReleaseDate)) {
          res.status(400).send({
            status: Constants.FAILED,
            message:
              '"fromReleaseDate" (' +
              req.body.fromReleaseDate +
              ") format is invalid.",
          });
          return;
        }
      }
      let toReleaseDate = null;
      if (req.body.toReleaseDate) {
        toReleaseDate = new Date(req.body.toReleaseDate);
        if (!Commons.isDate(toReleaseDate)) {
          res.status(400).send({
            status: Constants.FAILED,
            message:
              '"toReleaseDate" (' +
              req.body.toReleaseDate +
              ") format is invalid.",
          });
          return;
        }
      }

      // Call corresponding service method
      let result = await MovieService.getAllMovies(
        movieTitle,
        language,
        fromRunningTime,
        toRunningTime,
        fromReleaseDate,
        toReleaseDate
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Movies retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Movies not found.",
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

const deleteMovieById = async (req, res) => {
  let isAccessGranted = await Commons.authenticateToken(req, res);
  if (!isAccessGranted) {
    return;
  }
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieId = req.body.movieId;

      // Call corresponding service method
      let result = await MovieService.deleteMovieById(movieId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Movie (" + movieId + ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Movie (" + movieId + ") not found.",
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
  createMovie,
  updateMovie,
  getMovieById,
  getAllMovies,
  deleteMovieById,
};
