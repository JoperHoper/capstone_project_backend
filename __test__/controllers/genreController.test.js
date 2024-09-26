const Constants = require("../../common/constants.js");
const genreController = require("../../controllers/genreController.js");
const mockGenreService = require("../../services/genreService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the genreModel.js in genreService with this "fake" object
jest.mock("../../services/genreService.js", () => ({
  createGenre: jest.fn().mockResolvedValue({ genreId: 1, genre: "Some Genre" }),
  updateGenre: jest.fn().mockResolvedValue({ genreId: 1, genre: "Some Genre" }),
  getGenreById: jest
    .fn()
    .mockResolvedValue({ genreId: 1, genre: "Some Genre" }),
  getAllGenres: jest
    .fn()
    .mockResolvedValue([{ genreId: 1, genre: "Some Genre" }]),
  deleteGenreById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by genreId success
test("should return response object with genreId = (req.body.genreId) if retrieved", async () => {
  req = { body: { genreId: 1 }, query: { genreId: 1 } };
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
  await genreController.getGenreById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Genre (1) retrieved successfully.");
  expect(res.result.data.genreId).toBe(1);
  expect(res.result.data.genre).toBe("Some Genre");
  expect(mockGenreService.getGenreById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new Genre success
test("should return response object with genre = (req.body.genre) if saved", async () => {
  req = { body: { genre: "Some Genre" } };
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
  await genreController.createGenre(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Genre created successfully.");
  expect(res.result.data.genreId).toBe(1);
  expect(res.result.data.genre).toBe("Some Genre");
  expect(mockGenreService.createGenre).toHaveBeenCalled();
});

// =============
// Test 3 - Test update Genre success
test("should return response object with genre = (req.body.genre) if updated", async () => {
  req = { body: { genreId: 1, genre: "Some Genre" } };
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
  await genreController.updateGenre(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Genre (1) updated successfully.");
  expect(res.result.data.genreId).toBe(1);
  expect(res.result.data.genre).toBe("Some Genre");
  expect(mockGenreService.updateGenre).toHaveBeenCalled();
});

// =============
// Test 4 - Test delete Genre success
test("should return response object if deleted", async () => {
  req = { body: { genreId: 1 } };
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
  await genreController.deleteGenreById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Genre (1) has been deleted successfully.");
  expect(mockGenreService.deleteGenreById).toHaveBeenCalled();
});
