const DirectorService = require("../services/directorService.js");
const Constants = require("../common/constants.js");

const createDirector = async (req, res) => {
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

      // Call corresponding service method
      let result = await DirectorService.createDirector(name);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Director created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add Director.",
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

const updateDirector = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.directorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"directorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const directorId = req.body.directorId;
      const name = req.body.name ? req.body.name : "";

      // Call corresponding service method
      let result = await DirectorService.updateDirector(directorId, name);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Director (" + directorId + ") updated successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Director (" + directorId + ") not found.",
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

const getDirectorById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.directorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"directorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const directorId = req.body.directorId;

      // Call corresponding service method
      let result = await DirectorService.getDirectorById(directorId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Director (" + directorId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Director (" + directorId + ") not found.",
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

const getAllDirectors = async (req, res) => {
  if (req) {
    if (req.body) {
      // Call corresponding service method
      let result = await DirectorService.getAllDirectors();

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Directors retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Directors not found.",
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

const deleteDirectorById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.directorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"directorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const directorId = req.body.directorId;

      // Call corresponding service method
      let result = await DirectorService.deleteDirectorById(directorId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message:
            "Director (" + directorId + ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Director (" + directorId + ") not found.",
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
  createDirector,
  updateDirector,
  getDirectorById,
  getAllDirectors,
  deleteDirectorById,
};
