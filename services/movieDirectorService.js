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

  // Call corresponding SQL query
  let createdMovieDirector = await MovieDirectorModel.create({
    movieId: existingMovie.movieId,
    directorId: existingDirector.directorId,
    createdAt: Date.now(),
  });

  createdMovieDirector.movie = existingMovie;
  createdMovieDirector.director = existingDirector;

  // Return result back to caller
  if (createdMovieDirector) {
    return createdMovieDirector;
  } else {
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

  // Call corresponding SQL query
  let result = await MovieDirectorModel.update(
    {
      movieId: existingMovieDirector.movieId,
      directorId: existingMovieDirector.directorId,
      updatedAt: Date.now(),
    },
    { where: { movieDirectorId: movieDirectorId } }
  );

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

const getAllMovieDirectors = async () => {
  // Call corresponding SQL query
  let retrievedMovieDirectors = await MovieDirectorModel.findAll({});

  // Return result back to caller
  if (retrievedMovieDirectors && retrievedMovieDirectors.length > 0) {
    return retrievedMovieDirectors;
  } else {
    return null;
  }
};

const deleteMovieDirectorById = async (movieDirectorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieDirectorId)) return null;

  // Call corresponding SQL query
  let result = await MovieDirectorModel.destroy({
    where: { movieDirectorId: movieDirectorId },
  });

  // Return result back to caller
  if (result) {
    return true;
  } else {
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
