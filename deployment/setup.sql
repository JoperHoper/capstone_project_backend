CREATE DATABASE capstone_db;

/* actors table */
DROP TABLE IF EXISTS capstone_db.actors;
CREATE TABLE capstone_db.actors (
	actorId INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (actorId)
);

/* directors table */
DROP TABLE IF EXISTS capstone_db.directors;
CREATE TABLE capstone_db.directors (
	directorId INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (directorId)
);

/* users table */
DROP TABLE IF EXISTS capstone_db.users;
CREATE TABLE capstone_db.users (
	userId INT NOT NULL AUTO_INCREMENT,
	firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (userId)
);

/* genres table */
DROP TABLE IF EXISTS capstone_db.genres;
CREATE TABLE capstone_db.genres (
	genreId INT NOT NULL AUTO_INCREMENT,
	genre VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (genreId)
);

/* movies table */
DROP TABLE IF EXISTS capstone_db.movies;
CREATE TABLE capstone_db.movies (
	movieId INT NOT NULL AUTO_INCREMENT,
    movieTitle VARCHAR(255) NOT NULL,
    runningTime INT NOT NULL,
    releaseDate DATETIME NOT NULL,
    language VARCHAR(255) NOT NULL,
    synopsis VARCHAR(255) NOT NULL,
    posterUrl VARCHAR(255) NOT NULL,
    trailerUrl VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (movieId)
);

/* favourites table */
DROP TABLE IF EXISTS capstone_db.favourites;
CREATE TABLE capstone_db.favourites (
	favouriteId INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
	movieId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (favouriteId)
);

/* movie genre relationship table */
DROP TABLE IF EXISTS capstone_db.rs_movie_genre;
CREATE TABLE capstone_db.rs_movie_genre (
	movieGenreId INT NOT NULL AUTO_INCREMENT,
    movieId INT NOT NULL,
	genreId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (movieGenreId)
);

/* movie actors relationship table */
DROP TABLE IF EXISTS capstone_db.rs_movie_actor;
CREATE TABLE capstone_db.rs_movie_actor (
	movieActorId INT NOT NULL AUTO_INCREMENT,
    movieId INT NOT NULL,
	actorId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (movieActorId)
);

/* movie director relationship table */
DROP TABLE IF EXISTS capstone_db.rs_movie_director;
CREATE TABLE capstone_db.rs_movie_director (
	movieDirectorId INT NOT NULL AUTO_INCREMENT,
    movieId INT NOT NULL,
	directorId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (movieDirectorId)
);

/* boards table*/
DROP TABLE IF EXISTS capstone_db.boards;
CREATE TABLE capstone_db.boards (
	boardId INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (boardId)
);

/* movie director relationship table */
DROP TABLE IF EXISTS capstone_db.rs_board_favourite;
CREATE TABLE capstone_db.rs_board_favourite (
	boardFavouriteId INT NOT NULL AUTO_INCREMENT,
    boardId INT NOT NULL,
	favouriteId INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NULL,
    PRIMARY KEY (boardFavouriteId)
);