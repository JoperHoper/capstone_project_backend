const Constants = require("../../common/constants.js");
const actorController = require("../../controllers/actorController.js");
const mockActorService = require("../../services/actorService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the actorModel.js in actorService with this "fake" object
jest.mock("../../services/actorService.js", () => ({
  // sequelize: {
  //   transaction: jest.fn().mockResolvedValue({
  //     commit: jest.fn(),
  //     rollback: jest.fn(),
  //   }),
  // },
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
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
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
test("should return response object with name = (req.body.name) if saved", async () => {
  req = { body: { name: "Some Actor" } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await actorController.createActor(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Actor created successfully.");
  expect(res.result.data.actorId).toBe(1);
  expect(res.result.data.name).toBe("Some Actor");
  expect(mockActorService.createActor).toHaveBeenCalled();
});

// =============
// Test 3 - Test update Actor success
test("should return response object with name = (req.body.name) if updated", async () => {
  req = { body: { actorId: 1, name: "Some Actor" } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await actorController.updateActor(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Actor (1) updated successfully.");
  expect(res.result.data.actorId).toBe(1);
  expect(res.result.data.name).toBe("Some Actor");
  expect(mockActorService.updateActor).toHaveBeenCalled();
});

// =============
// Test 4 - Test delete Actor success
test("should return response object if deleted", async () => {
  req = { body: { actorId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await actorController.deleteActorById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Actor (1) has been deleted successfully.");
  expect(mockActorService.deleteActorById).toHaveBeenCalled();
});
