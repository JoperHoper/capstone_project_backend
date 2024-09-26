const GenreService = require("../services/genreService.js");
const Constants = require("../common/constants.js");

const createGenre = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.genre) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"genre" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const genre = req.body.genre;

      // Call corresponding service method
      let result = await GenreService.createGenre(genre);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Genre created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add Genre.",
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

const updateGenre = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.genreId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"genreId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const genreId = req.body.genreId;
      const genre = req.body.genre ? req.body.genre : "";

      // Call corresponding service method
      let result = await GenreService.updateGenre(genreId, genre);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Genre (" + genreId + ") updated successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to update Genre.",
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

const getGenreById = async (req, res) => {
  if (req) {
    if (req.body || req.query) {
      // Validate request body parameters
      if (!req.body.genreId && !req.query.genreId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"genreId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const genreId = req.query?.genreId
        ? parseInt(req.query.genreId)
        : parseInt(req.body.genreId);

      // Call corresponding service method
      let result = await GenreService.getGenreById(genreId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Genre (" + genreId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Genre (" + genreId + ") not found.",
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

const getAllGenres = async (req, res) => {
  if (req) {
    if (req.body) {
      // Call corresponding service method
      let result = await GenreService.getAllGenres();

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Genres retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Genres not found.",
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

const deleteGenreById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.genreId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"genreId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const genreId = req.body.genreId;

      // Call corresponding service method
      let result = await GenreService.deleteGenreById(genreId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Genre (" + genreId + ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Genre (" + genreId + ") not found.",
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
  createGenre,
  updateGenre,
  getGenreById,
  getAllGenres,
  deleteGenreById,
};
