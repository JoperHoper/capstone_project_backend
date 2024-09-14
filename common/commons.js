const forge = require("node-forge");
const fs = require("node:fs/promises");
const path = require("path");
const jsonWebToken = require("jsonwebtoken");
const dotenv = require("dotenv");

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

const authenticateToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  // Set up environment variables for use
  dotenv.config();
  jsonWebToken.verify(
    token,
    process.env.TOKEN_SECRET.toString(),
    (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      console.log(user);
      req.user = user;
    }
  );
};

module.exports = {
  isDate,
  isString,
  getForgePrivateKey,
  authenticateToken,
};
