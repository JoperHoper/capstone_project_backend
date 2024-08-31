const UserModel = require("../models/userModel.js");
const Constants = require("../common/constants.js");

const createUser = async (firstName, lastName, username, email, password) => {
  // Ensure valid input parameters
  if (!Commons.isString(firstName)) return null;
  if (!Commons.isString(lastName)) return null;
  if (!Commons.isString(username)) return null;
  if (!Commons.isString(email)) return null;
  if (!Commons.isString(password)) return null;

  // Call corresponding SQL query
  let createdUser = await UserModel.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: password,
    createdAt: Date.now(),
  });

  // Return result back to caller
  if (createdUser) {
    return createdUser;
  } else {
    return null;
  }
};

const updateUser = async (
  userId,
  firstName = "",
  lastName = "",
  username = "",
  email = "",
  password = ""
) => {
  // Ensure valid input parameters
  if (!Number.isInteger(userId)) return null;
  if (!Commons.isString(firstName)) return null;
  if (!Commons.isString(lastName)) return null;
  if (!Commons.isString(username)) return null;
  if (!Commons.isString(email)) return null;
  if (!Commons.isString(password)) return null;

  // Ensure there is existing movie before updating it
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
  if (password.length > 0) existingUser.password = password;

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

const getAllUsers = async () => {
  // Call corresponding SQL query
  let retrievedUsers = await UserModel.findAll({});

  // Return result back to caller
  if (retrievedUsers && retrievedUsers.length > 0) {
    return retrievedUsers;
  } else {
    return null;
  }
};

const deleteUserById = async (userId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(movieId)) return null;

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
  updateUser,
  getUserById,
  getAllUsers,
  deleteUserById,
};
