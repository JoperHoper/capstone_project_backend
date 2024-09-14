const Constants = require("../../common/constants.js");
const boardFavouriteController = require("../../controllers/boardFavouriteController.js");
const mockBoardFavouriteService = require("../../services/boardFavouriteService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the boardFavouriteModel.js in boardFavouriteService with this "fake" object
jest.mock("../../services/boardFavouriteService.js", () => ({
  createBoardFavourite: jest
    .fn()
    .mockResolvedValue({ boardFavouriteId: 1, boardId: 1, favouriteId: 1 }),
  updateBoardFavourite: jest
    .fn()
    .mockResolvedValue({ boardFavouriteId: 1, boardId: 1, favouriteId: 1 }),
  getBoardFavouriteById: jest
    .fn()
    .mockResolvedValue({ boardFavouriteId: 1, boardId: 1, favouriteId: 1 }),
  getAllBoardFavourites: jest
    .fn()
    .mockResolvedValue([{ boardFavouriteId: 1, boardId: 1, favouriteId: 1 }]),
  deleteBoardFavouriteById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by boardFavouriteId success
test("should return response object with boardFavouriteId = (req.body.boardFavouriteId) if retrieved", async () => {
  req = { body: { boardFavouriteId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await boardFavouriteController.getBoardFavouriteById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("BoardFavourite (1) retrieved successfully.");
  expect(res.result.data.boardFavouriteId).toBe(1);
  expect(res.result.data.boardId).toBe(1);
  expect(res.result.data.favouriteId).toBe(1);
  expect(mockBoardFavouriteService.getBoardFavouriteById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new BoardFavourite success
test("should return response object with boardId = (req.body.boardId) if saved", async () => {
  req = { body: { boardId: 1, favouriteId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await boardFavouriteController.createBoardFavourite(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("BoardFavourite created successfully.");
  expect(res.result.data.boardFavouriteId).toBe(1);
  expect(res.result.data.boardId).toBe(1);
  expect(res.result.data.favouriteId).toBe(1);
  expect(mockBoardFavouriteService.createBoardFavourite).toHaveBeenCalled();
});

// =============
// Test 3 - Test update BoardFavourite success
test("should return response object with boardFavouriteId = (req.body.boardFavouriteId) if updated", async () => {
  req = { body: { boardFavouriteId: 1, userId: 1, boardId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await boardFavouriteController.updateBoardFavourite(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("BoardFavourite (1) updated successfully.");
  expect(res.result.data.boardFavouriteId).toBe(1);
  expect(res.result.data.boardId).toBe(1);
  expect(res.result.data.favouriteId).toBe(1);
  expect(mockBoardFavouriteService.updateBoardFavourite).toHaveBeenCalled();
});

// =============
// Test 4 - Test delete BoardFavourite success
test("should return delete status if deleted", async () => {
  req = { body: { boardFavouriteId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await boardFavouriteController.deleteBoardFavouriteById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe(
    "BoardFavourite (1) has been deleted successfully."
  );
  expect(mockBoardFavouriteService.deleteBoardFavouriteById).toHaveBeenCalled();
});
