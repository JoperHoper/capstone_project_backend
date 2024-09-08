const genreService = require("../../services/genreService.js");
const mockGenreModel = require("../../models/genreModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the genreModel.js in genreService with this "fake" object
jest.mock("../../models/genreModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({ genre: "Create Name" }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest.fn().mockResolvedValue({ genreId: 1 }),
  update: jest.fn().mockResolvedValue([{ genreId: 1, genre: "Updated Name" }]),
}));

// =============
// Test 1 - Test retrieved by genreId success
test("should return object with genreId = (inputGenreId) if retrieved", async (inputGenreId = 1) => {
  const result = await genreService.getGenreById(inputGenreId);
  expect(mockGenreModel.findOne).toHaveBeenCalled();
  expect(result.genreId).toBe(inputGenreId);
});

// =============
// Test 2 - Test create new Genre success
test("should return object with name = (inputGenre) if saved", async (inputGenre = "Create Name") => {
  const result = await genreService.createGenre(inputGenre);
  expect(mockGenreModel.create).toHaveBeenCalled();
  expect(result.genre).toBe(inputGenre);
});

// =============
// Test 3 - Test update Genre success
test("should return object with name = (inputGenre) if updated", async (inputGenreId = 1, inputGenre = "Updated Name") => {
  const result = await genreService.updateGenre(inputGenreId, inputGenre);
  expect(mockGenreModel.update).toHaveBeenCalled();
  expect(result.genre).toBe(inputGenre);
});

// =============
// Test 4 - Test delete Genre success
test("should return true if deleted", async (genreId = 1) => {
  const result = await genreService.deleteGenreById(genreId);
  expect(mockGenreModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
