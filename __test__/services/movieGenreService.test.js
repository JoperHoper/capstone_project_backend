const movieGenreService = require("../../services/movieGenreService.js");
const mockMovieGenreModel = require("../../models/movieGenreModel.js");
const mockMovieService = require("../../services/movieService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replace the movieGenreModel.js in movieGenreService with this "fake" object
jest.mock("../../models/movieGenreModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({ movieId: 1, genreId: 1 }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest
    .fn()
    .mockResolvedValue({ movieGenreId: 1, movieId: 1, genreId: 1 }),
  update: jest
    .fn()
    .mockResolvedValue([{ movieGenreId: 1, movieId: 1, genreId: 1 }]),
}));

jest.mock("../../services/movieService.js", () => ({
  getMovieById: jest.fn().mockResolvedValue({ movieId: 1 }),
}));

// =============
// Test 1 - Test retrieved by movieGenreId success
test("should return object with movieGenreId = (inputMovieGenreId) if retrieved", async (inputMovieGenreId = 1) => {
  const result = await movieGenreService.getMovieGenreById(inputMovieGenreId);
  expect(mockMovieGenreModel.findOne).toHaveBeenCalled();
  expect(result.movieGenreId).toBe(inputMovieGenreId);
});

// =============
// Test 2 - Test create new MovieGenre success
test("should return object with movieId = (inputMovieId) & genreId = (inputGenreId) if saved", async (inputMovieId = 1, inputGenreId = 1) => {
  const result = await movieGenreService.createMovieGenre(
    inputMovieId,
    inputGenreId
  );
  expect(mockMovieGenreModel.create).toHaveBeenCalled();
  expect(result.movieId).toBe(inputMovieId);
  expect(result.genreId).toBe(inputGenreId);
});

// =============
// Test 3 - Test update MovieGenre success
test("should return object with movieId = (inputMovieId) & genreId = (inputGenreId) if updated", async (inputMovieGenreId = 1, inputMovieId = 1, inputGenreId = 1) => {
  const result = await movieGenreService.updateMovieGenre(
    inputMovieGenreId,
    inputMovieId,
    inputGenreId
  );
  expect(mockMovieGenreModel.update).toHaveBeenCalled();
  expect(result.movieGenreId).toBe(inputMovieGenreId);
  expect(result.movieId).toBe(inputMovieId);
  expect(result.genreId).toBe(inputGenreId);
});

// =============
// Test 4 - Test delete MovieGenre success
test("should return true if deleted", async (movieGenreId = 1) => {
  const result = await movieGenreService.deleteMovieGenreById(movieGenreId);
  expect(mockMovieGenreModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
