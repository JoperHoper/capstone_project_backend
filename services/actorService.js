const ActorModel = require("../models/actorModel.js");

const createActor = async (name) => {
  // Ensure valid input parameters
  if (!Commons.isString(name) || name.length == 0) return null;

  // Call corresponding SQL query
  let createdActor = await ActorModel.create({
    name: req.body.name,
    createdAt: Date.now(),
  });

  // Return result back to caller
  if (createdActor) {
    return createdActor;
  } else {
    return null;
  }
};

const updateActor = async (actorId, name = "") => {
  // Ensure valid input parameters
  if (!Number.isInteger(actorId)) return null;
  if (!Commons.isString(name)) return null;

  // Ensure there is existing movie before updating it
  let existingActor = await getActorById(actorId);
  if (!existingActor) {
    console.log("Actor (" + actorId + ") not found.");
    return null;
  }

  // Process input parameters and replace existing data if necessary
  if (name.length > 0) existingActor.name = name;

  // Call corresponding SQL query
  let result = await ActorModel.update(
    { name: name, updatedAt: Date.now() },
    { where: { actorId: actorId } }
  );

  // Return result back to caller
  if (result) {
    if (result && result.length > 0 && result[0] != 0) {
      return existingActor;
    } else {
      return null;
    }
  }
};

const getActorById = async (actorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(actorId)) return null;

  // Call corresponding SQL query
  let retrievedActor = await ActorModel.findOne({
    where: { actorId: actorId },
  });

  // Return result back to caller
  if (retrievedActor) {
    return retrievedActor;
  } else {
    return null;
  }
};

const getAllActors = async () => {
  // Call corresponding SQL query
  let retrievedActors = await ActorModel.findAll({});

  // Return result back to caller
  if (retrievedActors && retrievedActors.length > 0) {
    return retrievedActors;
  } else {
    return null;
  }
};

const deleteActorById = async (actorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(actorId)) return null;

  // Call corresponding SQL query
  let result = await ActorModel.destroy({ where: { actorId: actorId } });

  // Return result back to caller
  if (result) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  createActor,
  updateActor,
  getActorById,
  getAllActors,
  deleteActorById,
};
