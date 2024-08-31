const MovieActorModel = require("../models/movieActorModel.js");
const MovieService = require("./movieService.js");
const ActorService = require("./actorService.js");
const Commons = require("../common/commons.js");

const createMovieActor = async (movieId, actorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieId)) return null;
  if (!Number.isInteger(actorId)) return null;

  // Ensure there is existing movie before adding it
  let existingMovie = await MovieService.getMovieById(movieId);
  if (!existingMovie) {
    console.log("Movie (" + movieId + ") not found.");
    return null;
  }

  // Ensure there is existing actor before adding it
  let existingActor = await ActorService.getActorById(actorId);
  if (!existingActor) {
    console.log("Actor (" + actorId + ") not found.");
    return null;
  }

  // Call corresponding SQL query
  let createdMovieActor = await MovieActorModel.create({
    movieId: existingMovie.movieId,
    actorId: existingActor.actorId,
    createdAt: Date.now(),
  });

  createdMovieActor.movie = existingMovie;
  createdMovieActor.actor = existingActor;

  // Return result back to caller
  if (createdMovieActor) {
    return createdMovieActor;
  } else {
    return null;
  }
};

const updateMovieActor = async (movieActorId, movieId = -1, actorId = -1) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieActorId)) return null;
  if (!Number.isInteger(movieId)) return null;
  if (!Number.isInteger(actorId)) return null;

  // Ensure there is existing movieActor before updating it
  let existingMovieActor = await getMovieActorById(movieActorId);
  if (!existingMovieActor) {
    console.log("MovieActor (" + movieActorId + ") not found.");
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

  // Ensure there is existing actor before updating it
  let existingActor = null;
  if (actorId != -1) {
    existingActor = await ActorService.getActorById(actorId);
    if (!existingActor) {
      console.log("Actor (" + actorId + ") not found.");
      return null;
    }
  }

  // Process input parameters and replace existing data if necessary
  if (existingMovie) {
    existingMovieActor.movieId = existingMovie.movieId;
  }
  if (existingActor) {
    existingMovieActor.actorId = existingActor.actorId;
  }

  // Call corresponding SQL query
  let result = await MovieActorModel.update(
    {
      movieId: existingMovieActor.movieId,
      actorId: existingMovieActor.actorId,
      updatedAt: Date.now(),
    },
    { where: { movieActorId: movieActorId } }
  );

  existingMovieActor.movie = existingMovie;
  existingMovieActor.actor = existingActor;

  // Return result back to caller
  if (result) {
    if (result && result.length > 0 && result[0] != 0) {
      return existingMovieActor;
    } else {
      return null;
    }
  }
};

const getMovieActorById = async (movieActorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieActorId)) return null;

  // Call corresponding SQL query
  let retrievedMovieActor = await MovieActorModel.findOne({
    where: { movieActorId: movieActorId },
  });

  // Return result back to caller
  if (retrievedMovieActor) {
    return retrievedMovieActor;
  } else {
    return null;
  }
};

const getAllMovieActors = async () => {
  // Call corresponding SQL query
  let retrievedMovieActors = await MovieActorModel.findAll({});

  // Return result back to caller
  if (retrievedMovieActors && retrievedMovieActors.length > 0) {
    return retrievedMovieActors;
  } else {
    return null;
  }
};

const deleteMovieActorById = async (movieActorId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieActorId)) return null;

  // Call corresponding SQL query
  let result = await MovieActorModel.destroy({
    where: { movieActorId: movieActorId },
  });

  // Return result back to caller
  if (result) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  createMovieActor,
  updateMovieActor,
  getMovieActorById,
  getAllMovieActors,
  deleteMovieActorById,
};
