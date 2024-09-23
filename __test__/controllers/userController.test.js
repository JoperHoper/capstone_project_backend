const Constants = require("../../common/constants.js");
const userController = require("../../controllers/userController.js");
const mockUserService = require("../../services/userService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the userModel.js in userService with this "fake" object
jest.mock("../../services/userService.js", () => ({
  createUser: jest.fn().mockResolvedValue({
    userId: 1,
    name: "Some User",
    email: "test@testmail.com",
  }),
  updateUser: jest.fn().mockResolvedValue({
    userId: 1,
    name: "Some User",
    email: "test@testmail.com",
  }),
  getUserById: jest.fn().mockResolvedValue({
    userId: 1,
    name: "Some User",
    email: "test@testmail.com",
  }),
  getAllUsers: jest.fn().mockResolvedValue([]),
  deleteUserById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by userId fail without token
test("should return response object with failed status if given wrong jwt", async () => {
  req = {
    body: { userId: 1 },
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
  await userController.getUserById(req, res);
  expect(mockUserService.createUser).toHaveBeenCalledTimes(0);
});

// =============
// Test 2 - Test create new User success
test("should return response object with name = (req.body.name) if saved", async () => {
  req = {
    body: {
      name: "Some User",
      username: "username",
      email: "test@testmail.com",
      password:
        "a26ff51714e28df1c5c18822af0c9627dd6da46556dc341b84fcb4a31f8668ed249612120f8593b1ddc249876344fae1cac1c2c8f793c047a99c0637a144bd33d3d3da4f68c86b88c1ed4d217feec05e09245af3d7555563945d7263d323b349d108f29b03c8b02088f18b8d0a86aaa3f828118fff413693be5227c66aa62f51de1d9e17d2892dc4be61aa352375178eb7f36aefabc5f69da01ce9fc1d6b17cdf5b23ee5ffb0c5bd0e04182edbe2c0e52f8d9d3fdbcc720c16a1647813bac9b1b466638c3906f8dca1e3211ed607049c02a483768d9afc07849ad6d35cb15d6f9c1de83c2eeeb881f4fed0bf07100d193b1faffb54839417195de9b81d12f3ee",
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
  await userController.createUser(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("User created successfully.");
  expect(res.result.data.userId).toBe(1);
  expect(res.result.data.name).toBe("Some User");
  expect(res.result.data.email).toBe("test@testmail.com");
  expect(mockUserService.createUser).toHaveBeenCalled();
});

// =============
// Test 3 - Test update User success
test("should return response object with failed status if given wrong jwt", async () => {
  req = {
    body: {
      userId: 1,
      name: "Some User",
      email: "test@testmail.com",
    },
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
  await userController.updateUser(req, res);
  expect(mockUserService.updateUser).toHaveBeenCalledTimes(0);
});

// =============
// Test 4 - Test delete User success
test("should return response object if deleted", async () => {
  req = { body: { userId: 1 } };
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
  await userController.deleteUserById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("User (1) has been deleted successfully.");
  expect(mockUserService.deleteUserById).toHaveBeenCalled();
});
