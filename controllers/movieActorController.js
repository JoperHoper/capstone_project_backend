const MovieActorService = require("../services/movieActorService.js");
const Constants = require("../common/constants.js");

const createMovieActor = async (req, res) => {
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
      if (!req.body.actorId) {
        res.status(400).send({
          status: Constants.FAILED,
          message: '"actorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieId = req.body.movieId;
      const actorId = req.body.actorId;

      // Call corresponding service method
      let result = await MovieActorService.createMovieActor(movieId, actorId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieActor created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add MovieActor",
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

const updateMovieActor = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieActorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieActorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieActorId = req.body.movieActorId;
      const movieId = req.body.movieId ? req.body.movieId : -1;
      const actorId = req.body.actorId ? req.body.actorId : -1;

      // Call corresponding service method
      let result = await MovieActorService.updateMovieActor(
        movieActorId,
        movieId,
        actorId
      );

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieActor (" + movieActorId + ") updated successfully.",
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

const getMovieActorById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieActorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieActorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieActorId = req.body.movieActorId;

      // Call corresponding service method
      let result = await MovieActorService.getMovieActorById(movieActorId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieActor (" + movieActorId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "MovieActor (" + movieActorId + ") not found.",
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

const getAllMovieActors = async (req, res) => {
  if (req) {
    if (req.body) {
      // Call corresponding service method
      let result = await MovieActorService.getAllMovieActors();

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "MovieActors retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "MovieActors not found.",
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

const deleteMovieActorById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.movieActorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"movieActorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const movieActorId = req.body.movieActorId;

      // Call corresponding service method
      let result = await MovieActorService.deleteMovieActorById(movieActorId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "MovieActor (" + movieActorId + ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "MovieActor (" + movieActorId + ") not found.",
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
  createMovieActor,
  updateMovieActor,
  getMovieActorById,
  getAllMovieActors,
  deleteMovieActorById,
};
