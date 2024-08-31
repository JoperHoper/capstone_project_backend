"use strict";
// Require the models
const ActorModel = require("./actorModel.js");
const DirectorModel = require("./directorModel.js");
const FavouriteModel = require("./favouriteModel.js");
const GenreModel = require("./genreModel.js");
const MovieModel = require("./movieModel.js");
const MovieActorModel = require("./movieActorModel.js");
const MovieDirectorModel = require("./movieDirectorModel.js");
const MovieGenreModel = require("./movieGenreModel.js");
const UserModel = require("./userModel.js");

// Sync all models
async function init() {
  await ActorModel.sync();
  await DirectorModel.sync();
  await FavouriteModel.sync();
  await GenreModel.sync();
  await MovieModel.sync();
  await MovieActorModel.sync();
  await MovieDirectorModel.sync();
  await MovieGenreModel.sync();
  await UserModel.sync();
}

init();

// Define the relation schemas
// Favourite Relationship
FavouriteModel.hasOne(MovieModel, { foreignKey: "movieId" });
FavouriteModel.hasOne(UserModel, { foreignKey: "userId" });
// Movie - Actor Relationship
MovieActorModel.hasMany(MovieModel, { foreignKey: "movieId" });
// Movie - Director Relationship
MovieDirectorModel.hasMany(MovieModel, { foreignKey: "movieId" });
// Movie - Genre Relationship
MovieGenreModel.hasMany(MovieModel, { foreignKey: "movieId" });

module.exports = {
  ActorModel,
  DirectorModel,
  FavouriteModel,
  GenreModel,
  MovieModel,
  MovieActorModel,
  MovieDirectorModel,
  UserModel,
};
