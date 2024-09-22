const userService = require("../../services/userService.js");
const mockUserModel = require("../../models/userModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the userModel.js in userService with this "fake" object
jest.mock("../../models/userModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({
    name: "Name",
    username: "Username",
    email: "test@testemail.com",
  }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest.fn().mockResolvedValue({ userId: 1 }),
  update: jest.fn().mockResolvedValue([
    {
      userId: 1,
      name: "Name",
      username: "Username",
      email: "test@testemail.com",
    },
  ]),
}));

// =============
// Test 1 - Test retrieved by userId success
test("should return object with userId = (inputUserId) if retrieved", async (inputUserId = 1) => {
  const result = await userService.getUserById(inputUserId);
  expect(mockUserModel.findOne).toHaveBeenCalled();
  expect(result.userId).toBe(inputUserId);
});

// =============
// Test 2 - Test create new User success
test("should return object with name = (inputName) if saved", async (inputName = "Name", inputUsername = "Username", inputEmail = "test@testemail.com", inputPassword = "a26ff51714e28df1c5c18822af0c9627dd6da46556dc341b84fcb4a31f8668ed249612120f8593b1ddc249876344fae1cac1c2c8f793c047a99c0637a144bd33d3d3da4f68c86b88c1ed4d217feec05e09245af3d7555563945d7263d323b349d108f29b03c8b02088f18b8d0a86aaa3f828118fff413693be5227c66aa62f51de1d9e17d2892dc4be61aa352375178eb7f36aefabc5f69da01ce9fc1d6b17cdf5b23ee5ffb0c5bd0e04182edbe2c0e52f8d9d3fdbcc720c16a1647813bac9b1b466638c3906f8dca1e3211ed607049c02a483768d9afc07849ad6d35cb15d6f9c1de83c2eeeb881f4fed0bf07100d193b1faffb54839417195de9b81d12f3ee") => {
  const result = await userService.createUser(
    inputName,
    inputUsername,
    inputEmail,
    inputPassword
  );
  expect(mockUserModel.create).toHaveBeenCalled();
  expect(result.name).toBe(inputName);
  expect(result.username).toBe(inputUsername);
  expect(result.email).toBe(inputEmail);
});

// =============
// Test 3 - Test update User success
test("should return object with name = (inputName) if updated", async (inputUserId = 1, inputName = "Name", inputUsername = "Username", inputEmail = "test@testemail.com") => {
  const result = await userService.updateUser(
    inputUserId,
    inputName,
    inputUsername,
    inputEmail
  );
  expect(mockUserModel.update).toHaveBeenCalled();
  expect(result.userId).toBe(inputUserId);
  expect(result.name).toBe(inputName);
  expect(result.username).toBe(inputUsername);
  expect(result.email).toBe(inputEmail);
});

// =============
// Test 4 - Test delete User success
test("should return true if deleted", async (userId = 1) => {
  const result = await userService.deleteUserById(userId);
  expect(mockUserModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
