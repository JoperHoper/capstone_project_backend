const boardService = require("../../services/boardService.js");
const mockBoardModel = require("../../models/boardModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the boardModel.js in boardService with this "fake" object
jest.mock("../../models/boardModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({ name: "Create Name", userId: 1 }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest.fn().mockResolvedValue({ boardId: 1, userId: 1 }),
  update: jest
    .fn()
    .mockResolvedValue([{ boardId: 1, name: "Updated Name", userId: 1 }]),
}));

// =============
// Test 1 - Test retrieved by boardId success
test("should return object with boardId = (inputBoardId) if retrieved", async (inputBoardId = 1) => {
  const result = await boardService.getBoardById(inputBoardId);
  expect(mockBoardModel.findOne).toHaveBeenCalled();
  expect(result.boardId).toBe(inputBoardId);
  expect(result.userId).toBe(1);
});

// =============
// Test 2 - Test create new Board success
test("should return object with name = (inputName), userId = (inputUserId) if saved", async (inputName = "Create Name", inputUserId = 1) => {
  const result = await boardService.createBoard(inputName, inputUserId);
  expect(mockBoardModel.create).toHaveBeenCalled();
  expect(result.name).toBe(inputName);
  expect(result.userId).toBe(inputUserId);
});

// =============
// Test 3 - Test update Board success
test("should return object with name = (inputName) if updated", async (inputBoardId = 1, inputName = "Updated Name") => {
  const result = await boardService.updateBoard(inputBoardId, inputName);
  expect(mockBoardModel.update).toHaveBeenCalled();
  expect(result.name).toBe(inputName);
  expect(result.userId).toBe(1);
});

// =============
// Test 4 - Test delete Board success
test("should return true if deleted", async (boardId = 1) => {
  const result = await boardService.deleteBoardById(boardId);
  expect(mockBoardModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
