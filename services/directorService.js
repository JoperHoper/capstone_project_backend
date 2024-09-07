const DirectorModel = require("../models/directorModel.js");
const Commons = require("../common/commons.js");

const createDirector = async (name) => {
  // Ensure valid input parameters
  if (!Commons.isString(name) || name.length == 0) return null;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await DirectorModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let createdDirector = await DirectorModel.create(
      {
        name: name,
        createdAt: Date.now(),
      },
      { transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (createdDirector) {
      return createdDirector;
    } else {
      return null;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const updateDirector = async (directorId, name = "") => {
  // Ensure valid input parameters
  if (!Number.isInteger(directorId)) return null;
  if (!Commons.isString(name)) return null;

  // Ensure there is existing movie before updating it
  let existingDirector = await getDirectorById(directorId);
  if (!existingDirector) {
    console.log("Director (" + directorId + ") not found.");
    return null;
  }

  // Process input parameters and replace existing data if necessary
  if (name.length > 0) existingDirector.name = name;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await DirectorModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await DirectorModel.update(
      { name: name, updatedAt: Date.now() },
      { where: { directorId: directorId }, transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (result) {
      if (result && result.length > 0 && result[0] != 0) {
        return existingDirector;
      } else {
        return null;
      }
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const getDirectorById = async (directorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(directorId)) return null;

  // Call corresponding SQL query
  let retrievedDirector = await DirectorModel.findOne({
    where: { directorId: directorId },
  });

  // Return result back to caller
  if (retrievedDirector) {
    return retrievedDirector;
  } else {
    return null;
  }
};

const getAllDirectors = async () => {
  // Call corresponding SQL query
  let retrievedDirectors = await DirectorModel.findAll({});

  // Return result back to caller
  if (retrievedDirectors && retrievedDirectors.length > 0) {
    return retrievedDirectors;
  } else {
    return null;
  }
};

const deleteDirectorById = async (directorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(directorId)) return null;

  // Call corresponding SQL query
  let result = await DirectorModel.destroy({
    where: { directorId: directorId },
  });

  // Return result back to caller
  if (result) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  createDirector,
  updateDirector,
  getDirectorById,
  getAllDirectors,
  deleteDirectorById,
};
