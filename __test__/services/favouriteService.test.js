const favouriteService = require("../../services/favouriteService.js");
const mockFavouriteModel = require("../../models/favouriteModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the favouriteModel.js in favouriteService with this "fake" object
jest.mock("../../models/favouriteModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({ userId: 1, movieId: 1 }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest
    .fn()
    .mockResolvedValue({ favouriteId: 1, userId: 1, movieId: 1 }),
  update: jest
    .fn()
    .mockResolvedValue([{ favouriteId: 1, userId: 1, movieId: 1 }]),
}));

// =============
// Test 1 - Test retrieved by favouriteId success
test("should return object with favouriteId = (inputFavouriteId) if retrieved", async (inputFavouriteId = 1) => {
  const result = await favouriteService.getFavouriteById(inputFavouriteId);
  expect(mockFavouriteModel.findOne).toHaveBeenCalled();
  expect(result.favouriteId).toBe(inputFavouriteId);
});

// =============
// Test 2 - Test create new Favourite success
test("should return object with userId = (inputUserId) & movieId = (inputMovieId) if saved", async (inputUserId = 1, inputMovieId = 1) => {
  const result = await favouriteService.createFavourite(
    inputUserId,
    inputMovieId
  );
  expect(mockFavouriteModel.create).toHaveBeenCalled();
  expect(result.userId).toBe(inputUserId);
  expect(result.movieId).toBe(inputMovieId);
});

// =============
// Test 3 - Test update Favourite success
test("should return object with userId = (inputUserId) & movieId = (inputMovieId) if updated", async (inputFavouriteId = 1, inputUserId = 1, inputMovieId = 1) => {
  const result = await favouriteService.updateFavourite(
    inputFavouriteId,
    inputUserId,
    inputMovieId
  );
  expect(mockFavouriteModel.update).toHaveBeenCalled();
  expect(result.favouriteId).toBe(inputFavouriteId);
  expect(result.userId).toBe(inputUserId);
  expect(result.movieId).toBe(inputMovieId);
});

// =============
// Test 4 - Test delete Favourite success
test("should return true if deleted", async (favouriteId = 1) => {
  const result = await favouriteService.deleteFavouriteById(favouriteId);
  expect(mockFavouriteModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
