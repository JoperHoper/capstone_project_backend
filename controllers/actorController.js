const ActorService = require("../services/actorService.js");
const Constants = require("../common/constants.js");

const createActor = async (req, res) => {
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
      let result = await ActorService.createActor(name);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Actor created successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Failed to add Actor.",
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

const updateActor = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.actorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"actorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const actorId = req.body.actorId;
      const name = req.body.name ? req.body.name : "";

      // Call corresponding service method
      let result = await ActorService.updateActor(actorId, name);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Actor (" + actorId + ") updated successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Actor (" + actorId + ") not found.",
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

const getActorById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.actorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"actorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const actorId = req.body.actorId;

      // Call corresponding service method
      let result = await ActorService.getActorById(actorId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Actor (" + actorId + ") retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Actor (" + actorId + ") not found.",
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

const getAllActors = async (req, res) => {
  if (req) {
    if (req.body) {
      // Call corresponding service method
      let result = await ActorService.getAllActors();

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Actors retrieved successfully.",
          data: result,
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Actors not found.",
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

const deleteActorById = async (req, res) => {
  if (req) {
    if (req.body) {
      // Validate request body parameters
      if (!req.body.actorId) {
        res.status(200).send({
          status: Constants.FAILED,
          message: '"actorId" is not found in request.',
        });
        return;
      }

      // Extract and process body parameters from request
      const actorId = req.body.actorId;

      // Call corresponding service method
      let result = await ActorService.deleteActorById(actorId);

      // Send response back to caller based on result
      if (result) {
        res.status(200).send({
          status: Constants.SUCCESS,
          message: "Actor (" + actorId + ") has been deleted successfully.",
        });
        return;
      } else {
        res.status(200).send({
          status: Constants.FAILED,
          message: "Actor (" + actorId + ") not found.",
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
  createActor,
  updateActor,
  getActorById,
  getAllActors,
  deleteActorById,
};
