const Constants = require("../../common/constants.js");
const favouriteController = require("../../controllers/favouriteController.js");
const mockFavouriteService = require("../../services/favouriteService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the favouriteModel.js in favouriteService with this "fake" object
jest.mock("../../services/favouriteService.js", () => ({
  createFavourite: jest
    .fn()
    .mockResolvedValue({ favouriteId: 1, userId: 1, movieId: 1 }),
  updateFavourite: jest
    .fn()
    .mockResolvedValue({ favouriteId: 1, userId: 1, movieId: 1 }),
  getFavouriteById: jest
    .fn()
    .mockResolvedValue({ favouriteId: 1, userId: 1, movieId: 1 }),
  getAllFavourites: jest
    .fn()
    .mockResolvedValue([{ favouriteId: 1, userId: 1, movieId: 1 }]),
  deleteFavouriteById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by favouriteId success
test("should return response object with favouriteId = (req.body.favouriteId) if retrieved", async () => {
  req = { body: { favouriteId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await favouriteController.getFavouriteById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Favourite (1) retrieved successfully.");
  expect(res.result.data.favouriteId).toBe(1);
  expect(res.result.data.userId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(mockFavouriteService.getFavouriteById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new Favourite success
test("should return response object with genre = (req.body.genre) if saved", async () => {
  req = { body: { userId: 1, movieId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await favouriteController.createFavourite(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Favourite created successfully.");
  expect(res.result.data.favouriteId).toBe(1);
  expect(res.result.data.userId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(mockFavouriteService.createFavourite).toHaveBeenCalled();
});

// =============
// Test 3 - Test update Favourite success
test("should return response object with favouriteId = (req.body.favouriteId) if updated", async () => {
  req = { body: { favouriteId: 1, userId: 1, movieId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await favouriteController.updateFavourite(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Favourite (1) updated successfully.");
  expect(res.result.data.favouriteId).toBe(1);
  expect(res.result.data.userId).toBe(1);
  expect(res.result.data.movieId).toBe(1);
  expect(mockFavouriteService.updateFavourite).toHaveBeenCalled();
});

// =============
// Test 4 - Test delete Favourite success
test("should return delete status if deleted", async () => {
  req = { body: { favouriteId: 1 } };
  res = {
    result: {},
    status: (statusCode) => {
      return res;
    },
    send: (result) => {
      res.result = result;
    },
  };
  await favouriteController.deleteFavouriteById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe(
    "Favourite (1) has been deleted successfully."
  );
  expect(mockFavouriteService.deleteFavouriteById).toHaveBeenCalled();
});
