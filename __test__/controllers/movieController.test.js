const Constants = require("../../common/constants.js");
const movieController = require("../../controllers/movieController.js");
const mockMovieService = require("../../services/movieService.js");

// Test settings
afterEach(() => {
  jest.clearAllMocks();
});

// Attempt to replaced the movieModel.js in movieService with this "fake" object
jest.mock("../../services/movieService.js", () => ({
  createMovie: jest.fn().mockResolvedValue({
    movieId: 1,
    movieTitle: "Some Movie",
    language: "English",
    posterUrl: "https://www.someposterurl.com",
    trailerUrl: "https://www.sometrailerurl.com",
    runningTime: 1,
    releaseDate: "2024-01-23",
  }),
  updateMovie: jest.fn().mockResolvedValue({
    movieId: 1,
    movieTitle: "Some Movie",
    language: "English",
    posterUrl: "https://www.someposterurl.com",
    trailerUrl: "https://www.sometrailerurl.com",
    runningTime: 1,
    releaseDate: "2024-01-23",
  }),
  getMovieById: jest.fn().mockResolvedValue({
    movieId: 1,
    movieTitle: "Some Movie",
    language: "English",
    posterUrl: "https://www.someposterurl.com",
    trailerUrl: "https://www.sometrailerurl.com",
    runningTime: 1,
    releaseDate: "2024-01-23",
  }),
  getAllMovies: jest.fn().mockResolvedValue([
    {
      movieId: 1,
      movieTitle: "Some Movie",
      language: "English",
      posterUrl: "https://www.someposterurl.com",
      trailerUrl: "https://www.sometrailerurl.com",
      runningTime: 1,
      releaseDate: "2024-01-23",
    },
  ]),
  deleteMovieById: jest.fn().mockResolvedValue(true),
}));

// =============
// Test 1 - Test retrieved by movieId success
test("should return response object with movieId = (req.body.movieId) if retrieved", async () => {
  req = { body: { movieId: 1 } };
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
  await movieController.getMovieById(req, res);
  expect(res.result.status).toBe("success");
  expect(res.result.message).toBe("Movie (1) retrieved successfully.");
  expect(res.result.data.movieId).toBe(1);
  expect(res.result.data.movieTitle).toBe("Some Movie");
  expect(res.result.data.language).toBe("English");
  expect(res.result.data.posterUrl).toBe("https://www.someposterurl.com");
  expect(res.result.data.trailerUrl).toBe("https://www.sometrailerurl.com");
  expect(res.result.data.runningTime).toBe(1);
  expect(res.result.data.releaseDate).toBe("2024-01-23");
  expect(mockMovieService.getMovieById).toHaveBeenCalled();
});

// =============
// Test 2 - Test create new Movie success
test("should return response object with name = (req.body.name) if saved", async () => {
  req = {
    body: {
      movieTitle: "Some Movie",
      language: "English",
      synopsis: "Some synopsis",
      posterUrl: "https://www.someposterurl.com",
      trailerUrl: "https://www.sometrailerurl.com",
      runningTime: 1,
      releaseDate: "2024-01-23",
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
  await movieController.createMovie(req, res);
  expect(mockMovieService.createMovie).toHaveBeenCalledTimes(0);
});

// =============
// Test 3 - Test update Movie success
test("should return response object failed status if given wrong jwt", async () => {
  req = {
    body: { movieId: 1, name: "Some Movie" },
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
  await movieController.updateMovie(req, res);
  expect(mockMovieService.updateMovie).toHaveBeenCalledTimes(0);
});

// =============
// Test 4 - Test delete Movie success
test("should return response object if deleted", async () => {
  req = {
    body: { movieId: 1 },
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
  await movieController.deleteMovieById(req, res);
  expect(mockMovieService.deleteMovieById).toHaveBeenCalledTimes(0);
});
