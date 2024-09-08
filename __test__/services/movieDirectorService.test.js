const movieDirectorService = require("../../services/movieDirectorService.js");
const mockMovieDirectorModel = require("../../models/movieDirectorModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the movieDirectorModel.js in movieDirectorService with this "fake" object
jest.mock("../../models/movieDirectorModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({ movieId: 1, directorId: 1 }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest
    .fn()
    .mockResolvedValue({ movieDirectorId: 1, movieId: 1, directorId: 1 }),
  update: jest
    .fn()
    .mockResolvedValue([{ movieDirectorId: 1, movieId: 1, directorId: 1 }]),
}));

// =============
// Test 1 - Test retrieved by movieDirectorId success
test("should return object with movieDirectorId = (inputMovieDirectorId) if retrieved", async (inputMovieDirectorId = 1) => {
  const result = await movieDirectorService.getMovieDirectorById(
    inputMovieDirectorId
  );
  expect(mockMovieDirectorModel.findOne).toHaveBeenCalled();
  expect(result.movieDirectorId).toBe(inputMovieDirectorId);
});

// =============
// Test 2 - Test create new MovieDirector success
test("should return object with movieId = (inputMovieId) & directorId = (inputDirectorId) if saved", async (inputMovieId = 1, inputDirectorId = 1) => {
  const result = await movieDirectorService.createMovieDirector(
    inputMovieId,
    inputDirectorId
  );
  expect(mockMovieDirectorModel.create).toHaveBeenCalled();
  expect(result.movieId).toBe(inputMovieId);
  expect(result.directorId).toBe(inputDirectorId);
});

// =============
// Test 3 - Test update MovieDirector success
test("should return object with movieId = (inputMovieId) & directorId = (inputDirectorId) if updated", async (inputMovieDirectorId = 1, inputMovieId = 1, inputDirectorId = 1) => {
  const result = await movieDirectorService.updateMovieDirector(
    inputMovieDirectorId,
    inputMovieId,
    inputDirectorId
  );
  expect(mockMovieDirectorModel.update).toHaveBeenCalled();
  expect(result.movieDirectorId).toBe(inputMovieDirectorId);
  expect(result.movieId).toBe(inputMovieId);
  expect(result.directorId).toBe(inputDirectorId);
});

// =============
// Test 4 - Test delete MovieDirector success
test("should return true if deleted", async (movieDirectorId = 1) => {
  const result = await movieDirectorService.deleteMovieDirectorById(
    movieDirectorId
  );
  expect(mockMovieDirectorModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
