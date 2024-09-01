const bcrypt = require("bcrypt");
const forge = require("node-forge");
const UserModel = require("../models/userModel.js");
const Constants = require("../common/constants.js");
const Commons = require("../common/commons.js");

const createUser = async (firstName, lastName, username, email, password) => {
  // Ensure valid input parameters
  if (!Commons.isString(firstName)) return null;
  if (!Commons.isString(lastName)) return null;
  if (!Commons.isString(username)) return null;
  if (!Commons.isString(email)) return null;
  if (!Commons.isString(password)) return null;

  // Retrieve private key file contents to use for decryption of password
  const forgePrivateKey = await Commons.getForgePrivateKey();

  // Decrypt password received from front-end page
  let passwordInBytes = forge.util.hexToBytes(password);
  const decryptedPassword = forgePrivateKey.decrypt(passwordInBytes);

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

  // Call corresponding SQL query
  let createdUser = await UserModel.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    salt: userAccountSalt,
    password: hashedPassword,
    createdAt: Date.now(),
  });

  // Return result back to caller
  if (createdUser) {
    return createdUser;
  } else {
    return null;
  }
};

const login = async (username, password) => {
  // Retrieve private key file contents to use for decryption of password
  const forgePrivateKey = await Commons.getForgePrivateKey();

  // Decrypt password received from front-end page
  let passwordInBytes = forge.util.hexToBytes(password);
  const decryptedPassword = forgePrivateKey.decrypt(passwordInBytes);

  // Check if existing user with username exists
  let existingUser = await getUserByUsername(username);

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
    return existingUser;
  }

  return null;
};

const updateUser = async (
  userId,
  firstName = "",
  lastName = "",
  username = "",
  email = "",
  newPassword = ""
) => {
  // Ensure valid input parameters
  if (!Number.isInteger(userId)) return null;
  if (!Commons.isString(firstName)) return null;
  if (!Commons.isString(lastName)) return null;
  if (!Commons.isString(username)) return null;
  if (!Commons.isString(email)) return null;
  if (!Commons.isString(newPassword)) return null;

  // Ensure there is existing user before updating it
  let existingUser = await getUserById(userId);
  if (!existingUser) {
    console.log("User (" + userId + ") not found.");
    return null;
  }

  // Process input parameters and replace existing data if necessary
  if (firstName.length > 0) existingUser.firstName = firstName;
  if (lastName.length > 0) existingUser.lastName = lastName;
  if (username.length > 0) existingUser.username = username;
  if (email.length > 0) existingUser.email = email;
  if (newPassword.length > 0) {
    // Retrieve private key file contents to use for decryption of new password
    const forgePrivateKey = await Commons.getForgePrivateKey();

    // Decrypt password received from front-end page
    let newPasswordInBytes = forge.util.hexToBytes(newPassword);
    const decryptedPassword = forgePrivateKey.decrypt(newPasswordInBytes);

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

  // Call corresponding SQL query
  let result = await UserModel.update(
    {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      username: existingUser.username,
      email: existingUser.email,
      password: existingUser.password,
      updatedAt: Date.now(),
    },
    { where: { userId: userId } }
  );

  // Return result back to caller
  if (result) {
    if (result && result.length > 0 && result[0] != 0) {
      return existingUser;
    } else {
      return null;
    }
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

const getAllUsers = async () => {
  // Call corresponding SQL query
  let retrievedUsers = await UserModel.findAll({
    attributes: [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
      "createdAt",
      "updatedAt",
    ],
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
  if (!Number.isInteger(userId)) return null;

  // Call corresponding SQL query
  let result = await UserModel.destroy({ where: { userId: userId } });

  // Return result back to caller
  if (result) {
    return true;
  } else {
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
