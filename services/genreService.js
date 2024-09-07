const GenreModel = require("../models/genreModel.js");
const Commons = require("../common/commons.js");

const createGenre = async (genre) => {
  // Ensure valid input parameters
  if (!Commons.isString(genre)) return null;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await GenreModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let createdGenre = await GenreModel.create(
      {
        genre: genre,
        createdAt: Date.now(),
      },
      { transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (createdGenre) {
      return createdGenre;
    } else {
      return null;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const updateGenre = async (genreId, genre = "") => {
  // Ensure valid input parameters
  if (!Number.isInteger(genreId)) return null;
  if (!Commons.isString(genre)) return null;

  // Ensure there is existing genre before updating it
  let existingGenre = await getGenreById(genreId);
  if (!existingGenre) {
    console.log("Genre (" + genreId + ") not found.");
    return null;
  }

  // Process input parameters and replace existing data if necessary
  if (genre.length > 0) existingGenre.genre = genre;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await GenreModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await GenreModel.update(
      { genre: genre, updatedAt: Date.now() },
      { where: { genreId: genreId }, transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (result) {
      if (result && result.length > 0 && result[0] != 0) {
        return existingGenre;
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

const getGenreById = async (genreId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(genreId)) return null;

  // Call corresponding SQL query
  let retrievedGenre = await GenreModel.findOne({
    where: { genreId: genreId },
  });

  // Return result back to caller
  if (retrievedGenre) {
    return retrievedGenre;
  } else {
    return null;
  }
};

const getAllGenres = async (req, res) => {
  // Call corresponding SQL query
  let retrievedGenres = await GenreModel.findAll({});

  // Return result back to caller
  if (retrievedGenres && retrievedGenres.length > 0) {
    return retrievedGenres;
  } else {
    return null;
  }
};

const deleteGenreById = async (genreId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(genreId)) return false;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await GenreModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await GenreModel.destroy({
      where: { genreId: genreId },
      transaction: dbTransaction,
    });

    await dbTransaction.commit();

    // Return result back to caller
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return false;
  }
};

module.exports = {
  createGenre,
  updateGenre,
  getGenreById,
  getAllGenres,
  deleteGenreById,
};
