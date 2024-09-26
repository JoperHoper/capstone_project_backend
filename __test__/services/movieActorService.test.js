const movieActorService = require("../../services/movieActorService.js");
const mockMovieActorModel = require("../../models/movieActorModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the movieActorModel.js in movieActorService with this "fake" object
jest.mock("../../models/movieActorModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({ movieId: 1, actorId: 1 }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest
    .fn()
    .mockResolvedValue({ movieActorId: 1, movieId: 1, actorId: 1 }),
  update: jest
    .fn()
    .mockResolvedValue([{ movieActorId: 1, movieId: 1, actorId: 1 }]),
}));

// =============
// Test 1 - Test retrieved by movieActorId success
test("should return object with movieActorId = (inputMovieActorId) if retrieved", async (inputMovieActorId = 1) => {
  const result = await movieActorService.getMovieActorById(inputMovieActorId);
  expect(mockMovieActorModel.findOne).toHaveBeenCalled();
  expect(result.movieActorId).toBe(inputMovieActorId);
});

// =============
// Test 2 - Test create new MovieActor success
test("should return object with movieId = (inputMovieId) & actorId = (inputActorId) if saved", async (inputMovieId = 1, inputActorId = 1) => {
  const result = await movieActorService.createMovieActor(
    inputMovieId,
    inputActorId
  );
  expect(mockMovieActorModel.create).toHaveBeenCalled();
  expect(result.movieId).toBe(inputMovieId);
  expect(result.actorId).toBe(inputActorId);
});

// =============
// Test 3 - Test update MovieActor success
test("should return object with movieId = (inputMovieId) & actorId = (inputActorId) if updated", async (inputMovieActorId = 1, inputMovieId = 1, inputActorId = 1) => {
  const result = await movieActorService.updateMovieActor(
    inputMovieActorId,
    inputMovieId,
    inputActorId
  );
  expect(mockMovieActorModel.update).toHaveBeenCalled();
  expect(result.movieActorId).toBe(inputMovieActorId);
  expect(result.movieId).toBe(inputMovieId);
  expect(result.actorId).toBe(inputActorId);
});

// =============
// Test 4 - Test delete MovieActor success
test("should return true if deleted", async (movieActorId = 1) => {
  const result = await movieActorService.deleteMovieActorById(movieActorId);
  expect(mockMovieActorModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
