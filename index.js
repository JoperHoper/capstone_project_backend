// Initialize the express app with configuration settings
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;

// Import nested routes
const actorRouter = require("./routes/actorRoutes.js");
const directorRouter = require("./routes/directorRoutes.js");
const favouriteRouter = require("./routes/favouriteRoutes.js");
const genreRouter = require("./routes/genreRoutes.js");
const movieRouter = require("./routes/movieRoutes.js");
const movieActorRouter = require("./routes/movieActorRoutes.js");
const movieDirectorRouter = require("./routes/movieDirectorRoutes.js");
const movieGenreRouter = require("./routes/movieGenreRoutes.js");
const userRouter = require("./routes/userRoutes.js");

// Set up nested routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use("/actor", actorRouter);
app.use("/director", directorRouter);
app.use("/favourite", favouriteRouter);
app.use("/genre", genreRouter);
app.use("/movie", movieRouter);
app.use("/movie_actor", movieActorRouter);
app.use("/movie_director", movieDirectorRouter);
app.use("/movie_genre", movieGenreRouter);
app.use("/user", userRouter);

// Start the server
app.listen(PORT, "0.0.0.0", (error) => {
  if (!error) {
    console.log(
      "Server is up and running, and App is listening on port " + PORT
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
