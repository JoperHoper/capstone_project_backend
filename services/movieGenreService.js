const MovieGenreModel = require("../models/movieGenreModel.js");
const MovieService = require("./movieService.js");
const GenreService = require("./genreService.js");
const Commons = require("../common/commons.js");

const createMovieGenre = async (movieId, genreId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieId)) return null;
  if (!Number.isInteger(genreId)) return null;

  // Ensure there is existing movie before adding it
  let existingMovie = await MovieService.getMovieById(movieId);
  if (!existingMovie) {
    console.log("Movie (" + movieId + ") not found.");
    return null;
  }

  // Ensure there is existing genre before adding it
  let existingGenre = await GenreService.getGenreById(genreId);
  if (!existingGenre) {
    console.log("Genre (" + genreId + ") not found.");
    return null;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await MovieGenreModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let createdMovieGenre = await MovieGenreModel.create(
      {
        movieId: existingMovie.movieId,
        genreId: existingGenre.genreId,
        createdAt: Date.now(),
      },
      { transaction: dbTransaction }
    );

    await dbTransaction.commit();

    createdMovieGenre.movie = existingMovie;
    createdMovieGenre.genre = existingGenre;

    // Return result back to caller
    if (createdMovieGenre) {
      return createdMovieGenre;
    } else {
      return null;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const updateMovieGenre = async (movieGenreId, movieId = -1, genreId = -1) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieGenreId)) return null;
  if (!Number.isInteger(movieId)) return null;
  if (!Number.isInteger(genreId)) return null;

  // Ensure there is existing movieGenre before updating it
  let existingMovieGenre = await getMovieGenreById(movieGenreId);
  if (!existingMovieGenre) {
    console.log("MovieGenre (" + movieGenreId + ") not found.");
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

  // Ensure there is existing genre before updating it
  let existingGenre = null;
  if (genreId != -1) {
    existingGenre = await GenreService.getGenreById(genreId);
    if (!existingGenre) {
      console.log("Genre (" + genreId + ") not found.");
      return null;
    }
  }

  // Process input parameters and replace existing data if necessary
  if (existingMovie) {
    existingMovieGenre.movieId = existingMovie.movieId;
  }
  if (existingGenre) {
    existingMovieGenre.genreId = existingGenre.genreId;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await MovieGenreModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await MovieGenreModel.update(
      {
        movieId: existingMovieGenre.movieId,
        genreId: existingMovieGenre.genreId,
        updatedAt: Date.now(),
      },
      { where: { movieGenreId: movieGenreId }, transaction: dbTransaction }
    );

    await dbTransaction.commit();

    existingMovieGenre.movie = existingMovie;
    existingMovieGenre.genre = existingGenre;

    // Return result back to caller
    if (result) {
      if (result && result.length > 0 && result[0] != 0) {
        return existingMovieGenre;
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

const getMovieGenreById = async (movieGenreId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieGenreId)) return null;

  // Call corresponding SQL query
  let retrievedMovieGenre = await MovieGenreModel.findOne({
    where: { movieGenreId: movieGenreId },
  });

  // Return result back to caller
  if (retrievedMovieGenre) {
    return retrievedMovieGenre;
  } else {
    return null;
  }
};

const getAllMovieGenres = async (movieId = -1, genreId = -1) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieId)) return null;
  if (!Number.isInteger(genreId)) return null;

  // Craft filter condition
  let whereCondition = {};
  if (movieId != -1) {
    whereCondition.movieId = movieId;
  }
  if (genreId != -1) {
    whereCondition.genreId = genreId;
  }

  // Call corresponding SQL query
  let retrievedMovieGenres = await MovieGenreModel.findAll({
    where: whereCondition,
  });

  // Populate each movieGenre object with genre
  let retrievedGenres = await GenreService.getAllGenres();
  if (retrievedGenres != null) {
    for (let i = 0; i < retrievedMovieGenres.length; i++) {
      for (let j = 0; j < retrievedGenres.length; j++) {
        if (retrievedMovieGenres[i].genreId === retrievedGenres[j].genreId) {
          retrievedMovieGenres[i].genre = retrievedGenres[j];
        }
      }
    }
  }

  // Return result back to caller
  if (retrievedMovieGenres && retrievedMovieGenres.length > 0) {
    return retrievedMovieGenres;
  } else {
    return null;
  }
};

const deleteMovieGenreById = async (movieGenreId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieGenreId)) return null;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await MovieGenreModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await MovieGenreModel.destroy({
      where: { movieGenreId: movieGenreId },
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
    return null;
  }
};

module.exports = {
  createMovieGenre,
  updateMovieGenre,
  getMovieGenreById,
  getAllMovieGenres,
  deleteMovieGenreById,
};
