const movieService = require("../../services/movieService.js");
const mockMovieModel = require("../../models/movieModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the movieModel.js in movieService with this "fake" object
jest.mock("../../models/movieModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({
    movieTitle: "Movie",
    language: "English",
    synopsis: "Synopsis",
    posterUrl: "posterUrl",
    trailerUrl: "trailerUrl",
    runningTime: 123,
    releaseDate: new Date("2024-01-23"),
  }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest.fn().mockResolvedValue({ movieId: 1 }),
  update: jest.fn().mockResolvedValue([
    {
      movieId: 1,
      movieTitle: "Movie",
      language: "English",
      synopsis: "Synopsis",
      posterUrl: "posterUrl",
      trailerUrl: "trailerUrl",
      runningTime: 123,
      releaseDate: new Date("2024-01-23"),
    },
  ]),
}));

// =============
// Test 1 - Test retrieved by movieId success
test("should return object with movieId = (inputMovieId) if retrieved", async (inputMovieId = 1) => {
  const result = await movieService.getMovieById(inputMovieId);
  expect(mockMovieModel.findOne).toHaveBeenCalled();
  expect(result.movieId).toBe(inputMovieId);
});

// =============
// Test 2 - Test create new Movie success
test("should return object with movieTitle = (inputMovieTitle) if saved", async (inputMovieTitle = "Movie", inputLanguage = "English", inputSynopsis = "Synopsis", inputPosterUrl = "posterUrl", inputTrailerUrl = "trailerUrl", inputRunningTime = 123, inputReleaseDate = new Date(
  "2024-01-23"
)) => {
  const result = await movieService.createMovie(
    inputMovieTitle,
    inputLanguage,
    inputSynopsis,
    inputPosterUrl,
    inputTrailerUrl,
    inputRunningTime,
    inputReleaseDate
  );
  expect(mockMovieModel.create).toHaveBeenCalled();
  expect(result.movieTitle).toBe(inputMovieTitle);
  expect(result.language).toBe(inputLanguage);
  expect(result.synopsis).toBe(inputSynopsis);
  expect(result.posterUrl).toBe(inputPosterUrl);
  expect(result.trailerUrl).toBe(inputTrailerUrl);
  expect(result.runningTime).toBe(inputRunningTime);
  expect(result.releaseDate).toStrictEqual(inputReleaseDate);
});

// =============
// Test 3 - Test update Movie success
test("should return object with movieTitle = (inputMovieTitle) if updated", async (inputMovieId = 1, inputMovieTitle = "Movie", inputLanguage = "English", inputSynopsis = "Synopsis", inputPosterUrl = "posterUrl", inputTrailerUrl = "trailerUrl", inputRunningTime = 123, inputReleaseDate = new Date(
  "2024-01-23"
)) => {
  const result = await movieService.updateMovie(
    inputMovieId,
    inputMovieTitle,
    inputLanguage,
    inputSynopsis,
    inputPosterUrl,
    inputTrailerUrl,
    inputRunningTime,
    inputReleaseDate
  );
  expect(mockMovieModel.update).toHaveBeenCalled();
  expect(result.movieId).toBe(inputMovieId);
  expect(result.movieTitle).toBe(inputMovieTitle);
  expect(result.language).toBe(inputLanguage);
  expect(result.synopsis).toBe(inputSynopsis);
  expect(result.posterUrl).toBe(inputPosterUrl);
  expect(result.trailerUrl).toBe(inputTrailerUrl);
  expect(result.runningTime).toBe(inputRunningTime);
  expect(result.releaseDate).toBe(inputReleaseDate);
});

// =============
// Test 4 - Test delete Movie success
test("should return true if deleted", async (movieId = 1) => {
  const result = await movieService.deleteMovieById(movieId);
  expect(mockMovieModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
