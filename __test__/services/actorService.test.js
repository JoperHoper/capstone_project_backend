const actorService = require("../../services/actorService.js");
const mockActorModel = require("../../models/actorModel.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the actorModel.js in actorService with this "fake" object
jest.mock("../../models/actorModel.js", () => ({
  sequelize: {
    transaction: jest.fn().mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn(),
    }),
  },
  create: jest.fn().mockResolvedValue({ name: "Create Name" }),
  destroy: jest.fn().mockResolvedValue(true),
  findOne: jest.fn().mockResolvedValue({ actorId: 1 }),
  update: jest.fn().mockResolvedValue([{ actorId: 1, name: "Updated Name" }]),
}));

// =============
// Test 1 - Test retrieved by actorId success
test("should return object with actorId = (inputActorId) if retrieved", async (inputActorId = 1) => {
  const result = await actorService.getActorById(inputActorId);
  expect(mockActorModel.findOne).toHaveBeenCalled();
  expect(result.actorId).toBe(inputActorId);
});

// =============
// Test 2 - Test create new Actor success
test("should return object with name = (inputName) if saved", async (inputName = "Create Name") => {
  const result = await actorService.createActor(inputName);
  expect(mockActorModel.create).toHaveBeenCalled();
  expect(result.name).toBe(inputName);
});

// =============
// Test 3 - Test update Actor success
test("should return object with name = (inputName) if updated", async (inputActorId = 1, inputName = "Updated Name") => {
  const result = await actorService.updateActor(inputActorId, inputName);
  expect(mockActorModel.update).toHaveBeenCalled();
  expect(result.name).toBe(inputName);
});

// =============
// Test 4 - Test delete Actor success
test("should return true if deleted", async (actorId = 1) => {
  const result = await actorService.deleteActorById(actorId);
  expect(mockActorModel.destroy).toHaveBeenCalled();
  expect(result).toBe(true);
});
