const forge = require("node-forge");
const fs = require("node:fs/promises");
const path = require("path");
const jsonWebToken = require("jsonwebtoken");
const dotenv = require("dotenv");
const Constants = require("./constants.js");

const isDate = (inputVariable) => {
  if (Object.prototype.toString.call(inputVariable) === "[object Date]") {
    if (isNaN(inputVariable)) {
      return false;
    }
    return true;
  }
  return false;
};

const isString = (inputVariable) => {
  return typeof inputVariable === "string" || inputVariable instanceof String;
};

const getForgePrivateKey = async () => {
  // Retrieve private key file contents to use for decryption of password
  const privateKeyFilePath = path.join(__dirname, "../id_rsa_capstone");
  let privateKeyRSA = "";
  try {
    privateKeyRSA = await fs.readFile(privateKeyFilePath, {
      encoding: "utf-8",
    });
  } catch (err) {
    console.log(err);
    return null;
  }
  const forgePrivateKey = forge.pki.privateKeyFromPem(privateKeyRSA);
  return forgePrivateKey;
};

const authenticateToken = async (req, res) => {
  // Retrieve Json Web Token (JWT) from the request headers
  const authHeader = req.headers["authorization"];

  // Accepted JWT must be in the format of "XXX actual_token_here"
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.sendStatus(401);
    return false;
  }

  // Set up environment variables for use
  dotenv.config();

  // Verify JWT, and if successful, populate user information into the request
  let isVerifyJWTSuccessful = await jsonWebToken.verify(
    token,
    process.env.TOKEN_SECRET.toString(),
    (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(403);
        return false;
      }
      console.log(user);
      req.user = user;
      return true;
    }
  );
  return isVerifyJWTSuccessful;
};

module.exports = {
  isDate,
  isString,
  getForgePrivateKey,
  authenticateToken,
};
