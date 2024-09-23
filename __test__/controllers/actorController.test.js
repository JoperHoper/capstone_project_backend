const Constants = require("../../common/constants.js");
const actorController = require("../../controllers/actorController.js");
const mockActorService = require("../../services/actorService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the actorModel.js in actorService with this "fake" object
jest.mock("../../services/actorService.js", () => ({
  createActor: jest.fn().mockResolvedValue({ actorId: 1, name: "Some Actor" }),
  updateActor: jest.fn().mockResolvedValue({ actorId: 1, name: "Some Actor" }),
  getActorById: jest.fn().mockResolvedValue({ actorId: 1, name: "Some Actor" }),
  getAllActors: jest
    .fn()
    .mockResolvedValue([{ actorId: 1, name: "Some Actor" }]),
  deleteActorById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by actorId success
test("should return response object with actorId = (req.body.actorId) if retrieved", async () => {
  req = { body: { actorId: 1 } };
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
  await actorController.getActorById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Actor (1) retrieved successfully.");
  expect(res.result.data.actorId).toBe(1);
  expect(res.result.data.name).toBe("Some Actor");
  expect(mockActorService.getActorById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new Actor success
test("should return response object with failed status if  with name = (req.body.name) if given wrong jwt", async () => {
  req = {
    body: { name: "Some Actor" },
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
  await actorController.createActor(req, res);
  expect(mockActorService.createActor).toHaveBeenCalledTimes(0);
});

// =============
// Test 3 - Test update Actor success
test("should return response object with name = (req.body.name) if updated", async () => {
  req = {
    body: { actorId: 1, name: "Some Actor" },
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
  await actorController.updateActor(req, res);
  expect(mockActorService.updateActor).toHaveBeenCalledTimes(0);
});

// =============
// Test 4 - Test delete Actor success
test("should return response object with failed status if given wrong jwt", async () => {
  req = {
    body: { actorId: 1 },
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
  await actorController.deleteActorById(req, res);
  expect(res.statusCode).toBe(403);
  expect(mockActorService.deleteActorById).toHaveBeenCalledTimes(0);
});
