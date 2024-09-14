const Constants = require("../../common/constants.js");
const movieDirectorController = require("../../controllers/movieDirectorController.js");
const mockMovieDirectorService = require("../../services/movieDirectorService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the movieDirectorModel.js in movieDirectorService with this "fake" object
jest.mock("../../services/movieDirectorService.js", () => ({
  createMovieDirector: jest
    .fn()
    .mockResolvedValue({ movieDirectorId: 1, movieId: 1, directorId: 1 }),
  updateMovieDirector: jest
    .fn()
    .mockResolvedValue({ movieDirectorId: 1, movieId: 1, directorId: 1 }),
  getMovieDirectorById: jest
    .fn()
    .mockResolvedValue({ movieDirectorId: 1, movieId: 1, directorId: 1 }),
  getAllMovieDirectors: jest
    .fn()
    .mockResolvedValue([{ movieDirectorId: 1, movieId: 1, directorId: 1 }]),
  deleteMovieDirectorById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by movieDirectorId success
test("should return response object with movieDirectorId = (req.body.movieDirectorId) if retrieved", async () => {
  req = { body: { movieDirectorId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieDirectorController.getMovieDirectorById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("MovieDirector (1) retrieved successfully.");
  expect(res.result.data.movieDirectorId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.directorId).toBe(1);
  expect(mockMovieDirectorService.getMovieDirectorById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new MovieDirector success
test("should return response object with movieId = (req.body.movieId) if saved", async () => {
  req = { body: { movieId: 1, directorId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieDirectorController.createMovieDirector(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("MovieDirector created successfully.");
  expect(res.result.data.movieDirectorId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.directorId).toBe(1);
  expect(mockMovieDirectorService.createMovieDirector).toHaveBeenCalled();
});

// =============
// Test 3 - Test update MovieDirector success
test("should return response object with movieDirectorId = (req.body.movieDirectorId) if updated", async () => {
  req = { body: { movieDirectorId: 1, userId: 1, movieId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieDirectorController.updateMovieDirector(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("MovieDirector (1) updated successfully.");
  expect(res.result.data.movieDirectorId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.directorId).toBe(1);
  expect(mockMovieDirectorService.updateMovieDirector).toHaveBeenCalled();
});

// =============
// Test 4 - Test delete MovieDirector success
test("should return delete status if deleted", async () => {
  req = { body: { movieDirectorId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieDirectorController.deleteMovieDirectorById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe(
    "MovieDirector (1) has been deleted successfully."
  );
  expect(mockMovieDirectorService.deleteMovieDirectorById).toHaveBeenCalled();
});
