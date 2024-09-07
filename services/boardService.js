const BoardModel = require("../models/boardModel.js");
const Commons = require("../common/commons.js");

const createBoard = async (name, userId) => {
  // Ensure valid input parameters
  if (!Commons.isString(name) || name.length == 0) return null;
  if (!Number.isInteger(userId)) return null;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await BoardModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let createdBoard = await BoardModel.create(
      {
        name: name,
        userId: userId,
        createdAt: Date.now(),
      },
      { transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (createdBoard) {
      return createdBoard;
    } else {
      return null;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const updateBoard = async (boardId, name = "") => {
  // Ensure valid input parameters
  if (!Number.isInteger(boardId)) return null;
  if (!Commons.isString(name)) return null;

  // Ensure there is existing board before updating it
  let existingBoard = await getBoardById(boardId);
  if (!existingBoard) {
    console.log("Board (" + boardId + ") not found.");
    return null;
  }

  // Process input parameters and replace existing data if necessary
  if (name.length > 0) existingBoard.name = name;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await BoardModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await BoardModel.update(
      { name: existingBoard.name, updatedAt: Date.now() },
      { where: { boardId: boardId }, transaction: dbTransaction }
    );

    await dbTransaction.commit();

    // Return result back to caller
    if (result) {
      if (result && result.length > 0 && result[0] != 0) {
        return existingBoard;
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

const getBoardById = async (boardId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(boardId)) return null;

  // Call corresponding SQL query
  let retrievedBoard = await BoardModel.findOne({
    where: { boardId: boardId },
  });

  // Return result back to caller
  if (retrievedBoard) {
    return retrievedBoard;
  } else {
    return null;
  }
};

const getAllBoards = async (userId = -1) => {
  // Ensure valid input parameters
  if (!Number.isInteger(userId)) return null;

  // Craft filter condition
  let whereCondition = {};
  if (userId != -1) {
    whereCondition.userId = userId;
  }

  // Call corresponding SQL query
  let retrievedBoards = await BoardModel.findAll({ where: whereCondition });

  // Return result back to caller
  if (retrievedBoards && retrievedBoards.length > 0) {
    return retrievedBoards;
  } else {
    return null;
  }
};

const deleteBoardById = async (boardId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(boardId)) return null;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await BoardModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await BoardModel.destroy({
      where: { boardId: boardId },
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
    return null;
  }
};

module.exports = {
  createBoard,
  updateBoard,
  getBoardById,
  getAllBoards,
  deleteBoardById,
};
