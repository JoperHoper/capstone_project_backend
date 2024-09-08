const directorService = require("../../services/directorService.js");
const mockDirectorModel = require("../../models/directorModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the directorModel.js in directorService with this "fake" object
jest.mock("../../models/directorModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({ name: "Create Name" }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest.fn().mockResolvedValue({ directorId: 1 }),
  update: jest
    .fn()
    .mockResolvedValue([{ directorId: 1, name: "Updated Name" }]),
}));

// =============
// Test 1 - Test retrieved by directorId success
test("should return object with directorId = (inputDirectorId) if retrieved", async (inputDirectorId = 1) => {
  const result = await directorService.getDirectorById(inputDirectorId);
  expect(mockDirectorModel.findOne).toHaveBeenCalled();
  expect(result.directorId).toBe(inputDirectorId);
});

// =============
// Test 2 - Test create new Director success
test("should return object with name = (inputName) if saved", async (inputName = "Create Name") => {
  const result = await directorService.createDirector(inputName);
  expect(mockDirectorModel.create).toHaveBeenCalled();
  expect(result.name).toBe(inputName);
});

// =============
// Test 3 - Test update Director success
test("should return object with name = (inputName) if updated", async (inputDirectorId = 1, inputName = "Updated Name") => {
  const result = await directorService.updateDirector(
    inputDirectorId,
    inputName
  );
  expect(mockDirectorModel.update).toHaveBeenCalled();
  expect(result.name).toBe(inputName);
});

// =============
// Test 4 - Test delete Director success
test("should return true if deleted", async (directorId = 1) => {
  const result = await directorService.deleteDirectorById(directorId);
  expect(mockDirectorModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
