const boardFavouriteService = require("../../services/boardFavouriteService.js");
const mockBoardFavouriteModel = require("../../models/boardFavouriteModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the boardFavouriteModel.js in boardFavouriteService with this "fake" object
jest.mock("../../models/boardFavouriteModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({ boardId: 1, favouriteId: 1 }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest
    .fn()
    .mockResolvedValue({ boardFavouriteId: 1, boardId: 1, favouriteId: 1 }),
  update: jest
    .fn()
    .mockResolvedValue([{ boardFavouriteId: 1, boardId: 1, favouriteId: 1 }]),
}));

// =============
// Test 1 - Test retrieved by boardFavouriteId success
test("should return object with boardFavouriteId = (inputBoardFavouriteId) if retrieved", async (inputBoardFavouriteId = 1) => {
  const result = await boardFavouriteService.getBoardFavouriteById(
    inputBoardFavouriteId
  );
  expect(mockBoardFavouriteModel.findOne).toHaveBeenCalled();
  expect(result.boardFavouriteId).toBe(inputBoardFavouriteId);
});

// =============
// Test 2 - Test create new BoardFavourite success
test("should return object with boardId = (inputBoardId) & favouriteId = (inputFavouriteId) if saved", async (inputBoardId = 1, inputFavouriteId = 1) => {
  const result = await boardFavouriteService.createBoardFavourite(
    inputBoardId,
    inputFavouriteId
  );
  expect(mockBoardFavouriteModel.create).toHaveBeenCalled();
  expect(result.boardId).toBe(inputBoardId);
  expect(result.favouriteId).toBe(inputFavouriteId);
});

// =============
// Test 3 - Test update BoardFavourite success
test("should return object with boardId = (inputBoardId) & favouriteId = (inputFavouriteId) if updated", async (inputBoardFavouriteId = 1, inputBoardId = 1, inputFavouriteId = 1) => {
  const result = await boardFavouriteService.updateBoardFavourite(
    inputBoardFavouriteId,
    inputBoardId,
    inputFavouriteId
  );
  expect(mockBoardFavouriteModel.update).toHaveBeenCalled();
  expect(result.boardFavouriteId).toBe(inputBoardFavouriteId);
  expect(result.boardId).toBe(inputBoardId);
  expect(result.favouriteId).toBe(inputFavouriteId);
});

// =============
// Test 4 - Test delete BoardFavourite success
test("should return true if deleted", async (boardFavouriteId = 1) => {
  const result = await boardFavouriteService.deleteBoardFavouriteById(
    boardFavouriteId
  );
  expect(mockBoardFavouriteModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
