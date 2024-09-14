const Constants = require("../../common/constants.js");
const movieActorController = require("../../controllers/movieActorController.js");
const mockMovieActorService = require("../../services/movieActorService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the movieActorModel.js in movieActorService with this "fake" object
jest.mock("../../services/movieActorService.js", () => ({
  createMovieActor: jest
    .fn()
    .mockResolvedValue({ movieActorId: 1, movieId: 1, actorId: 1 }),
  updateMovieActor: jest
    .fn()
    .mockResolvedValue({ movieActorId: 1, movieId: 1, actorId: 1 }),
  getMovieActorById: jest
    .fn()
    .mockResolvedValue({ movieActorId: 1, movieId: 1, actorId: 1 }),
  getAllMovieActors: jest
    .fn()
    .mockResolvedValue([{ movieActorId: 1, movieId: 1, actorId: 1 }]),
  deleteMovieActorById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by movieActorId success
test("should return response object with movieActorId = (req.body.movieActorId) if retrieved", async () => {
  req = { body: { movieActorId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieActorController.getMovieActorById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("MovieActor (1) retrieved successfully.");
  expect(res.result.data.movieActorId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.actorId).toBe(1);
  expect(mockMovieActorService.getMovieActorById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new MovieActor success
test("should return response object with movieId = (req.body.movieId) if saved", async () => {
  req = { body: { movieId: 1, actorId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieActorController.createMovieActor(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("MovieActor created successfully.");
  expect(res.result.data.movieActorId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.actorId).toBe(1);
  expect(mockMovieActorService.createMovieActor).toHaveBeenCalled();
});

// =============
// Test 3 - Test update MovieActor success
test("should return response object with movieActorId = (req.body.movieActorId) if updated", async () => {
  req = { body: { movieActorId: 1, userId: 1, movieId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieActorController.updateMovieActor(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("MovieActor (1) updated successfully.");
  expect(res.result.data.movieActorId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.actorId).toBe(1);
  expect(mockMovieActorService.updateMovieActor).toHaveBeenCalled();
});

// =============
// Test 4 - Test delete MovieActor success
test("should return delete status if deleted", async () => {
  req = { body: { movieActorId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await movieActorController.deleteMovieActorById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe(
    "MovieActor (1) has been deleted successfully."
  );
  expect(mockMovieActorService.deleteMovieActorById).toHaveBeenCalled();
});
