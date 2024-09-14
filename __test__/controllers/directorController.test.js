const Constants = require("../../common/constants.js");
const directorController = require("../../controllers/directorController.js");
const mockDirectorService = require("../../services/directorService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the directorModel.js in directorService with this "fake" object
jest.mock("../../services/directorService.js", () => ({
  createDirector: jest
    .fn()
    .mockResolvedValue({ directorId: 1, name: "Some Director" }),
  updateDirector: jest
    .fn()
    .mockResolvedValue({ directorId: 1, name: "Some Director" }),
  getDirectorById: jest
    .fn()
    .mockResolvedValue({ directorId: 1, name: "Some Director" }),
  getAllDirectors: jest
    .fn()
    .mockResolvedValue([{ directorId: 1, name: "Some Director" }]),
  deleteDirectorById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by directorId success
test("should return response object with directorId = (req.body.directorId) if retrieved", async () => {
  req = { body: { directorId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await directorController.getDirectorById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Director (1) retrieved successfully.");
  expect(res.result.data.directorId).toBe(1);
  expect(res.result.data.name).toBe("Some Director");
  expect(mockDirectorService.getDirectorById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new Director success
test("should return response object with name = (req.body.name) if saved", async () => {
  req = { body: { name: "Some Director" } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await directorController.createDirector(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Director created successfully.");
  expect(res.result.data.directorId).toBe(1);
  expect(res.result.data.name).toBe("Some Director");
  expect(mockDirectorService.createDirector).toHaveBeenCalled();
});

// =============
// Test 3 - Test update Director success
test("should return response object with name = (req.body.name) if updated", async () => {
  req = { body: { directorId: 1, name: "Some Director" } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await directorController.updateDirector(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Director (1) updated successfully.");
  expect(res.result.data.directorId).toBe(1);
  expect(res.result.data.name).toBe("Some Director");
  expect(mockDirectorService.updateDirector).toHaveBeenCalled();
});

// =============
// Test 4 - Test delete Director success
test("should return response object if deleted", async () => {
  req = { body: { directorId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await directorController.deleteDirectorById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe(
    "Director (1) has been deleted successfully."
  );
  expect(mockDirectorService.deleteDirectorById).toHaveBeenCalled();
});
