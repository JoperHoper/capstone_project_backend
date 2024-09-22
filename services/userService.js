const bcrypt = require("bcrypt");
const forge = require("node-forge");
const UserModel = require("../models/userModel.js");
const Constants = require("../common/constants.js");
const Commons = require("../common/commons.js");
const jsonWebToken = require("jsonwebtoken");
const dotenv = require("dotenv");
const BoardService = require("../services/boardService.js");

const createUser = async (name, username, email, password) => {
  // Ensure valid input parameters
  if (!Commons.isString(name)) return null;
  if (!Commons.isString(username)) return null;
  if (!Commons.isString(email)) return null;
  if (!Commons.isString(password)) return null;

  // Retrieve private key file contents to use for decryption of password
  const forgePrivateKey = await Commons.getForgePrivateKey();

  // Decrypt password received from front-end page
  let passwordInBytes = forge.util.hexToBytes(password);
  let decryptedPassword = "";
  try {
    decryptedPassword = forgePrivateKey.decrypt(passwordInBytes);
  } catch (err) {
    console.log(err);
    return null;
  }

  // Generate salt for this User account to store into DB
  const saltRounds = 10;
  let userAccountSalt = "";
  try {
    userAccountSalt = await bcrypt.genSalt(saltRounds);
  } catch (err) {
    console.log(err);
    return null;
  }

  // Generate hashed password
  let hashedPassword = "";
  try {
    hashedPassword = await bcrypt.hash(
      decryptedPassword.toString("utf-8"),
      userAccountSalt
    );
  } catch (err) {
    console.log(err);
    return null;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await UserModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let createdUser = await UserModel.create(
      {
        name: name,
        username: username,
        email: email,
        dob: new Date("9999-12-31"),
        salt: userAccountSalt,
        password: hashedPassword,
        createdAt: Date.now(),
      },
      { transaction: dbTransaction }
    );

    // Create a default board upon user creation
    await BoardService.createBoard(Constants.DEFAULT, createdUser.userId);

    await dbTransaction.commit();

    // Return result back to caller
    if (createdUser) {
      return createdUser;
    } else {
      return null;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const login = async (username, password) => {
  // Retrieve private key file contents to use for decryption of password
  const forgePrivateKey = await Commons.getForgePrivateKey();

  // Decrypt password received from front-end page
  let passwordInBytes = forge.util.hexToBytes(password);
  let decryptedPassword = "";
  try {
    decryptedPassword = forgePrivateKey.decrypt(passwordInBytes);
  } catch (err) {
    console.log(err);
    return null;
  }

  // Check if existing user with username exists
  let existingUser = await getUserByUsername(username);
  if (existingUser == null) {
    console.log("User with username (" + username + ") not found.");
    return null;
  }

  // Compare hashed password to check validity of input account credentials
  let hashedPasswordToCompare = "";
  try {
    hashedPasswordToCompare = await bcrypt.hash(
      decryptedPassword.toString("utf-8"),
      existingUser.salt
    );
  } catch (err) {
    console.log(err);
    return null;
  }

  // If password is correct, return user information to caller
  if (existingUser.password == hashedPasswordToCompare) {
    // Set up environment variables for use
    dotenv.config();
    const accessToken = generateAccessToken(username, existingUser.userId);

    return accessToken;
  }

  return null;
};

const generateAccessToken = (username, userId) => {
  return jsonWebToken.sign(
    { username: username, userId: userId },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1800s",
    }
  );
};

const updateUser = async (
  userId,
  name = "",
  username = "",
  email = "",
  bio = "",
  dateOfBirth = null,
  newPassword = ""
) => {
  // Ensure valid input parameters
  if (!Number.isInteger(userId)) return null;
  if (!Commons.isString(name)) return null;
  if (!Commons.isString(username)) return null;
  if (!Commons.isString(email)) return null;
  if (!Commons.isString(bio)) return null;
  if (dateOfBirth != null && !Commons.isDate(dateOfBirth)) return null;
  if (!Commons.isString(newPassword)) return null;

  // Ensure there is existing user before updating it
  let existingUser = await getUserById(userId);
  if (!existingUser) {
    console.log("User (" + userId + ") not found.");
    return null;
  }

  // Process input parameters and replace existing data if necessary
  if (name.length > 0) existingUser.name = name;
  if (username.length > 0) existingUser.username = username;
  if (email.length > 0) existingUser.email = email;
  if (bio.length > 0) existingUser.bio = bio;
  if (dateOfBirth != null) existingUser.dob = dateOfBirth;

  if (newPassword.length > 0) {
    // Retrieve private key file contents to use for decryption of new password
    const forgePrivateKey = await Commons.getForgePrivateKey();

    // Decrypt password received from front-end page
    let newPasswordInBytes = forge.util.hexToBytes(newPassword);
    let decryptedPassword = "";
    try {
      decryptedPassword = forgePrivateKey.decrypt(newPasswordInBytes);
    } catch (err) {
      console.log(err);
      return null;
    }

    // Generate hashed password
    let newHashedPassword = "";
    try {
      newHashedPassword = await bcrypt.hash(
        decryptedPassword.toString("utf-8"),
        existingUser.salt
      );
    } catch (err) {
      console.log(err);
      return null;
    }

    existingUser.password = newHashedPassword;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await UserModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await UserModel.update(
      {
        name: existingUser.name,
        username: existingUser.username,
        email: existingUser.email,
        bio: existingUser.bio,
        dob: existingUser.dob,
        password: existingUser.password,
        updatedAt: Date.now(),
      },
      { where: { userId: userId }, transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (result) {
      if (result && result.length > 0 && result[0] != 0) {
        return existingUser;
      } else {
        return null;
      }
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const getUserById = async (userId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(userId)) return null;

  // Call corresponding SQL query
  let retrievedUser = await UserModel.findOne({
    where: { userId: userId },
  });

  // Return result back to caller
  if (retrievedUser) {
    console.log("here");
    return retrievedUser;
  } else {
    return null;
  }
};

const getUserByUsername = async (username) => {
  // Ensure valid input parameters
  if (!Commons.isString(username)) return null;

  // Call corresponding SQL query
  let retrievedUser = await UserModel.findOne({
    where: { username: username },
  });

  // Return result back to caller
  if (retrievedUser) {
    return retrievedUser;
  } else {
    return null;
  }
};

const getAllUsers = async (name = "", username = "", email = "") => {
  // Craft filter condition
  let whereCondition = {};
  if (name.length > 0) {
    whereCondition.name = name;
  }
  if (username.length > 0) {
    whereCondition.username = username;
  }
  if (email.length > 0) {
    whereCondition.email = email;
  }

  // Call corresponding SQL query
  let retrievedUsers = await UserModel.findAll({
    attributes: [
      "name",
      "username",
      "email",
      "password",
      "createdAt",
      "updatedAt",
    ],
    where: whereCondition,
  });

  // Return result back to caller
  if (retrievedUsers && retrievedUsers.length > 0) {
    return retrievedUsers;
  } else {
    return null;
  }
};

const deleteUserById = async (userId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(userId)) return false;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await UserModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await UserModel.destroy({
      where: { userId: userId },
      transaction: dbTransaction,
    });

    await dbTransaction.commit();

    // Return result back to caller
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return false;
  }
};

module.exports = {
  createUser,
  login,
  updateUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  deleteUserById,
};
