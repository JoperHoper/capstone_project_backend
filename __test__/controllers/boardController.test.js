const Constants = require("../../common/constants.js");
const boardController = require("../../controllers/boardController.js");
const mockBoardService = require("../../services/boardService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the boardModel.js in boardService with this "fake" object
jest.mock("../../services/boardService.js", () => ({
  createBoard: jest.fn().mockResolvedValue({ boardId: 1, name: "Some Board" }),
  updateBoard: jest.fn().mockResolvedValue({ boardId: 1, name: "Some Board" }),
  getBoardById: jest.fn().mockResolvedValue({ boardId: 1, name: "Some Board" }),
  getAllBoards: jest
    .fn()
    .mockResolvedValue([{ boardId: 1, name: "Some Board" }]),
  deleteBoardById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by boardId success
test("should return response object with boardId = (inputBoardId) if retrieved", async () => {
  req = { body: { boardId: 1 }, query: { boardId: 1 } };
  res = {
    result: {},
    statusCode: -1,
    status: (inputStatusCode) => {
      res.statusCode = inputStatusCode;
      return res;
    },
    send: (result) => {
      res.result = result;
    },
    sendStatus: (inputStatusCode) => {
      res.statusCode = inputStatusCode;
      return res;
    },
  };
  await boardController.getBoardById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Board (1) retrieved successfully.");
  expect(res.result.data.boardId).toBe(1);
  expect(res.result.data.name).toBe("Some Board");
  expect(mockBoardService.getBoardById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new Board success
test("should return response object with failed status if given wrong jwt", async () => {
  req = {
    body: { name: "Some Board", userId: 1 },
    headers: {
      authorization:
        "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsZXguc3VuIiwidXNlcklkIjozLCJpYXQiOjE3MjY3NTY2NDAsImV4cCI6MTcyNjc1ODQ0MH0.0zohtUWB_JTEtPa7HCiOmvZPh01pt7Aefu2WM_I-e7w",
    },
  };
  res = {
    result: {},
    statusCode: -1,
    status: (inputStatusCode) => {
      res.statusCode = inputStatusCode;
      return res;
    },
    send: (result) => {
      res.result = result;
    },
    sendStatus: (inputStatusCode) => {
      res.statusCode = inputStatusCode;
      return res;
    },
  };
  await boardController.createBoard(req, res);
  expect(mockBoardService.createBoard).toHaveBeenCalledTimes(0);
});

// =============
// Test 3 - Test update Board success
test("should return response object with name = (req.body.name) if updated", async () => {
  req = { body: { boardId: 1, name: "Some Board", userId: 1 } };
  res = {
    result: {},
    statusCode: -1,
    status: (inputStatusCode) => {
      res.statusCode = inputStatusCode;
      return res;
    },
    send: (result) => {
      res.result = result;
    },
    sendStatus: (inputStatusCode) => {
      res.statusCode = inputStatusCode;
      return res;
    },
  };
  await boardController.updateBoard(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Board (1) updated successfully.");
  expect(res.result.data.boardId).toBe(1);
  expect(res.result.data.name).toBe("Some Board");
  expect(mockBoardService.updateBoard).toHaveBeenCalled();
});

// =============
// Test 4 - Test delete Board success
test("should return response object if deleted", async () => {
  req = { body: { boardId: 1 } };
  res = {
    result: {},
    statusCode: -1,
    status: (inputStatusCode) => {
      res.statusCode = inputStatusCode;
      return res;
    },
    send: (result) => {
      res.result = result;
    },
    sendStatus: (inputStatusCode) => {
      res.statusCode = inputStatusCode;
      return res;
    },
  };
  await boardController.deleteBoardById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Board (1) has been deleted successfully.");
  expect(mockBoardService.deleteBoardById).toHaveBeenCalled();
});
