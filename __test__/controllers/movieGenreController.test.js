const Constants = require("../../common/constants.js");
const movieGenreController = require("../../controllers/movieGenreController.js");
const mockMovieGenreService = require("../../services/movieGenreService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the movieGenreModel.js in movieGenreService with this "fake" object
jest.mock("../../services/movieGenreService.js", () => ({
  createMovieGenre: jest
    .fn()
    .mockResolvedValue({ movieGenreId: 1, movieId: 1, genreId: 1 }),
  updateMovieGenre: jest
    .fn()
    .mockResolvedValue({ movieGenreId: 1, movieId: 1, genreId: 1 }),
  getMovieGenreById: jest
    .fn()
    .mockResolvedValue({ movieGenreId: 1, movieId: 1, genreId: 1 }),
  getAllMovieGenres: jest
    .fn()
    .mockResolvedValue([{ movieGenreId: 1, movieId: 1, genreId: 1 }]),
  deleteMovieGenreById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by movieGenreId success
test("should return response object with movieGenreId = (req.body.movieGenreId) if retrieved", async () => {
  req = { body: { movieGenreId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieGenreController.getMovieGenreById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("MovieGenre (1) retrieved successfully.");
  expect(res.result.data.movieGenreId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.genreId).toBe(1);
  expect(mockMovieGenreService.getMovieGenreById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new MovieGenre success
test("should return response object with movieId = (req.body.movieId) if saved", async () => {
  req = { body: { movieId: 1, genreId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieGenreController.createMovieGenre(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("MovieGenre created successfully.");
  expect(res.result.data.movieGenreId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.genreId).toBe(1);
  expect(mockMovieGenreService.createMovieGenre).toHaveBeenCalled();
});

// =============
// Test 3 - Test update MovieGenre success
test("should return response object with movieGenreId = (req.body.movieGenreId) if updated", async () => {
  req = { body: { movieGenreId: 1, userId: 1, movieId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieGenreController.updateMovieGenre(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("MovieGenre (1) updated successfully.");
  expect(res.result.data.movieGenreId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.genreId).toBe(1);
  expect(mockMovieGenreService.updateMovieGenre).toHaveBeenCalled();
});

// =============
// Test 4 - Test delete MovieGenre success
test("should return delete status if deleted", async () => {
  req = { body: { movieGenreId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieGenreController.deleteMovieGenreById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe(
    "MovieGenre (1) has been deleted successfully."
  );
  expect(mockMovieGenreService.deleteMovieGenreById).toHaveBeenCalled();
});
