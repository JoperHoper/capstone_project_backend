const { Op } = require("sequelize");
const MovieDirectorModel = require("../models/movieDirectorModel.js");
const MovieService = require("./movieService.js");
const DirectorService = require("./directorService.js");
const Commons = require("../common/commons.js");

const createMovieDirector = async (movieId, directorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieId)) return null;
  if (!Number.isInteger(directorId)) return null;

  // Ensure there is existing movie before adding it
  let existingMovie = await MovieService.getMovieById(movieId);
  if (!existingMovie) {
    console.log("Movie (" + movieId + ") not found.");
    return null;
  }

  // Ensure there is existing director before adding it
  let existingDirector = await DirectorService.getDirectorById(directorId);
  if (!existingDirector) {
    console.log("Director (" + directorId + ") not found.");
    return null;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await MovieDirectorModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let createdMovieDirector = await MovieDirectorModel.create(
      {
        movieId: existingMovie.movieId,
        directorId: existingDirector.directorId,
        createdAt: Date.now(),
      },
      { transaction: dbTransaction }
    );

    await dbTransaction.commit();

    createdMovieDirector.movie = existingMovie;
    createdMovieDirector.director = existingDirector;

    // Return result back to caller
    if (createdMovieDirector) {
      return createdMovieDirector;
    } else {
      return null;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const updateMovieDirector = async (
  movieDirectorId,
  movieId = -1,
  directorId = -1
) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieDirectorId)) return null;
  if (!Number.isInteger(movieId)) return null;
  if (!Number.isInteger(directorId)) return null;

  // Ensure there is existing movieDirector before updating it
  let existingMovieDirector = await getMovieDirectorById(movieDirectorId);
  if (!existingMovieDirector) {
    console.log("MovieDirector (" + movieDirectorId + ") not found.");
    return null;
  }

  // Ensure there is existing movie before updating it
  let existingMovie = null;
  if (movieId != -1) {
    existingMovie = await MovieService.getMovieById(movieId);
    if (!existingMovie) {
      console.log("Movie (" + movieId + ") not found.");
      return null;
    }
  }

  // Ensure there is existing director before updating it
  let existingDirector = null;
  if (directorId != -1) {
    existingDirector = await DirectorService.getDirectorById(directorId);
    if (!existingDirector) {
      console.log("Director (" + directorId + ") not found.");
      return null;
    }
  }

  // Process input parameters and replace existing data if necessary
  if (existingMovie) {
    existingMovieDirector.movieId = existingMovie.movieId;
  }
  if (existingDirector) {
    existingMovieDirector.directorId = existingDirector.directorId;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await MovieDirectorModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await MovieDirectorModel.update(
      {
        movieId: existingMovieDirector.movieId,
        directorId: existingMovieDirector.directorId,
        updatedAt: Date.now(),
      },
      {
        where: { movieDirectorId: movieDirectorId },
        transaction: dbTransaction,
      }
    );

    await dbTransaction.commit();

    existingMovieDirector.movie = existingMovie;
    existingMovieDirector.director = existingDirector;

    // Return result back to caller
    if (result) {
      if (result && result.length > 0 && result[0] != 0) {
        return existingMovieDirector;
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

const getMovieDirectorById = async (movieDirectorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieDirectorId)) return null;

  // Call corresponding SQL query
  let retrievedMovieDirector = await MovieDirectorModel.findOne({
    where: { movieDirectorId: movieDirectorId },
  });

  // Return result back to caller
  if (retrievedMovieDirector) {
    return retrievedMovieDirector;
  } else {
    return null;
  }
};

const getAllMovieDirectors = async (name = "") => {
  // Craft filter condition
  let whereCondition = {};
  if (name.length > 0) {
    whereCondition.name = { [Op.like]: "%" + name + "%" };
  }

  // Call corresponding SQL query
  let retrievedMovieDirectors = await MovieDirectorModel.findAll({
    where: whereCondition,
  });

  // Return result back to caller
  if (retrievedMovieDirectors && retrievedMovieDirectors.length > 0) {
    return retrievedMovieDirectors;
  } else {
    return null;
  }
};

const deleteMovieDirectorById = async (movieDirectorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieDirectorId)) return false;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await MovieDirectorModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await MovieDirectorModel.destroy({
      where: { movieDirectorId: movieDirectorId },
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
  createMovieDirector,
  updateMovieDirector,
  getMovieDirectorById,
  getAllMovieDirectors,
  deleteMovieDirectorById,
};
