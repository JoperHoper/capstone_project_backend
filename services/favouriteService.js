const FavouriteModel = require("../models/favouriteModel.js");
const MovieService = require("../services/movieService.js");
const UserService = require("../services/userService.js");
const Commons = require("../common/commons.js");

const createFavourite = async (userId, movieId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(userId)) return null;
  if (!Number.isInteger(movieId)) return null;

  // Ensure there is existing user before adding entry
  let existingUser = await UserService.getUserById(userId);
  if (!existingUser) {
    console.log("User (" + userId + ") not found.");
    return null;
  }

  // Ensure there is existing movie before adding entry
  let existingMovie = await MovieService.getMovieById(movieId);
  if (!existingMovie) {
    console.log("Movie (" + movieId + ") not found.");
    return null;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await FavouriteModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let createdFavourite = await FavouriteModel.create(
      {
        userId: existingUser.userId,
        movieId: existingMovie.movieId,
        createdAt: Date.now(),
      },
      { transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (createdFavourite) {
      return createdFavourite;
    } else {
      return null;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const updateFavourite = async (favouriteId, userId = -1, movieId = -1) => {
  // Ensure valid input parameters
  if (!Number.isInteger(favouriteId)) return null;
  if (!Number.isInteger(userId)) return null;
  if (!Number.isInteger(movieId)) return null;

  // Ensure there is existing favourite before updating it
  let existingFavourite = await getFavouriteById(favouriteId);
  if (!existingFavourite) {
    console.log("Favourite (" + favouriteId + ") not found.");
    return null;
  }

  // Ensure there is existing user before updating it
  let existingUser = null;
  if (userId != -1) {
    existingUser = await UserService.getUserById(userId);
    if (!existingUser) {
      console.log("User (" + userId + ") not found.");
      return null;
    }
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

  // Process input parameters and replace existing data if necessary
  if (existingUser) {
    existingFavourite.userId = existingUser.userId;
  }
  if (existingMovie) {
    existingFavourite.movieId = existingMovie.movieId;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await FavouriteModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await FavouriteModel.update(
      {
        userId: existingFavourite.userId,
        movieId: existingFavourite.movieId,
        updatedAt: Date.now(),
      },
      { where: { favouriteId: favouriteId }, transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (result) {
      if (result && result.length > 0 && result[0] != 0) {
        return existingFavourite;
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

const getFavouriteById = async (favouriteId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(favouriteId)) return null;

  // Call corresponding SQL query
  let retrievedFavourite = await FavouriteModel.findOne({
    where: { favouriteId: favouriteId },
  });

  // Ensure there is existing user before adding entry
  let existingUser = await UserService.getUserById(retrievedFavourite.userId);
  if (!existingUser) {
    console.log("Error retrieving User (" + userId + ").");
    return null;
  }

  // Ensure there is existing movie before adding entry
  let existingMovie = await MovieService.getMovieById(
    retrievedFavourite.movieId
  );
  if (!existingMovie) {
    console.log("Error retrieving Movie (" + movieId + ").");
    return null;
  }

  retrievedFavourite.user = existingUser;
  retrievedFavourite.movie = existingMovie;

  // Return result back to caller
  if (retrievedFavourite) {
    return retrievedFavourite;
  } else {
    return null;
  }
};

const getAllFavourites = async () => {
  // Call corresponding SQL query
  let retrievedFavourites = await FavouriteModel.findAll({});

  // Return result back to caller
  if (retrievedFavourites && retrievedFavourites.length > 0) {
    return retrievedFavourites;
  } else {
    return null;
  }
};

const deleteFavouriteById = async (favouriteId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(favouriteId)) return false;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await FavouriteModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await FavouriteModel.destroy({
      where: { favouriteId: favouriteId },
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
  createFavourite,
  updateFavourite,
  getFavouriteById,
  getAllFavourites,
  deleteFavouriteById,
};
