const MovieModel = require("../models/movieModel.js");
const { Op, where } = require("sequelize");
const Commons = require("../common/commons.js");
const movieGenreService = require("./movieGenreService.js");

const createMovie = async (
  movieTitle,
  language,
  synopsis = "",
  posterUrl = "",
  trailerUrl = "",
  runningTime,
  releaseDate
) => {
  // Ensure valid input parameters
  if (!Commons.isString(movieTitle)) return null;
  if (!Commons.isString(language)) return null;
  if (!Commons.isString(synopsis)) return null;
  if (!Commons.isString(posterUrl)) return null;
  if (!Commons.isString(trailerUrl)) return null;
  if (!Number.isInteger(runningTime)) return null;
  if (!Commons.isDate(releaseDate)) return null;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await MovieModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let createdMovie = await MovieModel.create(
      {
        movieTitle: movieTitle,
        language: language,
        synopsis: synopsis,
        posterUrl: posterUrl,
        trailerUrl: trailerUrl,
        runningTime: runningTime,
        releaseDate: releaseDate,
        createdAt: Date.now(),
      },
      { transaction: dbTransaction }
    );
    await dbTransaction.commit();

    // Return result back to caller
    if (createdMovie) {
      return createdMovie;
    } else {
      return null;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const updateMovie = async (
  movieId,
  movieTitle = "",
  language = "",
  synopsis = "",
  posterUrl = "",
  trailerUrl = "",
  runningTime = -1,
  releaseDate = null
) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieId)) return null;
  if (!Commons.isString(movieTitle)) return null;
  if (!Commons.isString(language)) return null;
  if (!Commons.isString(synopsis)) return null;
  if (!Commons.isString(posterUrl)) return null;
  if (!Commons.isString(trailerUrl)) return null;
  if (!Number.isInteger(runningTime)) return null;
  if (releaseDate != null && !Commons.isDate(releaseDate)) return null;

  // Ensure there is existing movie before updating it
  let existingMovie = await getMovieById(movieId);
  if (!existingMovie) {
    console.log("Movie (" + movieId + ") not found.");
    return null;
  }

  // Process input parameters and replace existing data if necessary
  if (movieTitle.length > 0) existingMovie.movieTitle = movieTitle;
  if (language.length > 0) existingMovie.language = language;
  if (synopsis.length > 0) existingMovie.synopsis = synopsis;
  if (posterUrl.length > 0) existingMovie.posterUrl = posterUrl;
  if (trailerUrl.length > 0) existingMovie.trailerUrl = trailerUrl;
  if (runningTime != -1) existingMovie.runningTime = runningTime;
  if (releaseDate != null) existingMovie.releaseDate = releaseDate;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await MovieModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await MovieModel.update(
      {
        movieTitle: existingMovie.movieTitle,
        language: existingMovie.language,
        synopsis: existingMovie.synopsis,
        posterUrl: existingMovie.posterUrl,
        trailerUrl: existingMovie.trailerUrl,
        runningTime: existingMovie.runningTime,
        releaseDate: existingMovie.releaseDate,
        updatedAt: Date.now(),
      },
      { where: { movieId: movieId }, transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (result) {
      if (result && result.length > 0 && result[0] != 0) {
        return existingMovie;
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

const getMovieById = async (movieId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieId)) return null;

  // Call corresponding SQL query
  let retrievedMovie = await MovieModel.findOne({
    where: { movieId: movieId },
  });

  // Populate genre of movie object
  let movieGenreList = await movieGenreService.getAllMovieGenres(
    retrievedMovie.movieId,
    -1
  );
  if (movieGenreList != null) {
    retrievedMovie.genres = [];
    for (let i = 0; i < movieGenreList.length; i++) {
      if (movieGenreList[i].genre != null) {
        retrievedMovie.genres.push(movieGenreList[i].genre);
      }
    }
  }

  // Return result back to caller
  if (retrievedMovie) {
    return retrievedMovie;
  } else {
    return null;
  }
};

const getAllMovies = async (
  movieTitle = "",
  language = "",
  fromRunningTime = -1,
  toRunningTime = -1,
  fromReleaseDate = null,
  toReleaseDate = null
) => {
  // Ensure valid input parameters
  if (!Number.isInteger(fromRunningTime)) return null;
  if (!Number.isInteger(toRunningTime)) return null;

  // Craft filter condition
  let whereCondition = {};
  if (movieTitle.length > 0) {
    whereCondition.movieTitle = { [Op.like]: "%" + movieTitle + "%" };
  }
  if (language.length > 0) {
    whereCondition.language = { [Op.like]: "%" + language + "%" };
  }
  if (fromRunningTime != -1) {
    if (!whereCondition.runningTime) {
      whereCondition.runningTime = {};
    }
    whereCondition.runningTime[Op.gte] = fromRunningTime;
  }
  if (toRunningTime != -1) {
    if (!whereCondition.runningTime) {
      whereCondition.runningTime = {};
    }
    whereCondition.runningTime[Op.lte] = toRunningTime;
  }
  if (fromReleaseDate != null) {
    whereCondition.releaseDate = { [Op.gte]: fromReleaseDate };
  }
  if (toReleaseDate != null) {
    whereCondition.releaseDate = { [Op.lte]: toReleaseDate };
  }

  // Call corresponding SQL query
  let retrievedMovies = await MovieModel.findAll({ where: whereCondition });

  let retrievedMovieGenreList = await movieGenreService.getAllMovieGenres();
  if (retrievedMovieGenreList != null) {
    for (let i = 0; i < retrievedMovies.length; i++) {
      retrievedMovies[i].genres = [];
      for (let j = 0; j < retrievedMovieGenreList.length; j++) {
        if (retrievedMovieGenreList[j].movieId === retrievedMovies[i].movieId) {
          if (retrievedMovieGenreList[j].genre != null) {
            retrievedMovies[i].genres.push(retrievedMovieGenreList[j].genre);
          }
        }
      }
    }
  }

  // Return result back to caller
  if (retrievedMovies && retrievedMovies.length > 0) {
    return retrievedMovies;
  } else {
    return null;
  }
};

const deleteMovieById = async (movieId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieId)) return false;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await MovieModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await MovieModel.destroy({
      where: { movieId: movieId },
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
  createMovie,
  updateMovie,
  getMovieById,
  getAllMovies,
  deleteMovieById,
};
