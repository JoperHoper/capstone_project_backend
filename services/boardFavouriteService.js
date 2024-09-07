const BoardFavouriteModel = require("../models/boardFavouriteModel.js");
const BoardService = require("./boardService.js");
const FavouriteService = require("./favouriteService.js");
const Commons = require("../common/commons.js");

const createBoardFavourite = async (boardId, favouriteId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(boardId)) return null;
  if (!Number.isInteger(favouriteId)) return null;

  // Ensure there is existing board before adding it
  let existingBoard = await BoardService.getBoardById(boardId);
  if (!existingBoard) {
    console.log("Board (" + boardId + ") not found.");
    return null;
  }

  // Ensure there is existing favourite before adding it
  let existingFavourite = await FavouriteService.getFavouriteById(favouriteId);
  if (!existingFavourite) {
    console.log("Favourite (" + favouriteId + ") not found.");
    return null;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await BoardFavouriteModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let createdBoardFavourite = await BoardFavouriteModel.create(
      {
        boardId: existingBoard.boardId,
        favouriteId: existingFavourite.favouriteId,
        createdAt: Date.now(),
      },
      { transaction: dbTransaction }
    );

    await dbTransaction.commit();

    createdBoardFavourite.board = existingBoard;
    createdBoardFavourite.favourite = existingFavourite;

    // Return result back to caller
    if (createdBoardFavourite) {
      return createdBoardFavourite;
    } else {
      return null;
    }
  } catch (transactionError) {
    // If any error is experienced during query, roll back the transaction
    await dbTransaction.rollback();
    return null;
  }
};

const updateBoardFavourite = async (
  boardFavouriteId,
  boardId = -1,
  favouriteId = -1
) => {
  // Ensure valid input parameters
  if (!Number.isInteger(boardFavouriteId)) return null;
  if (!Number.isInteger(boardId)) return null;
  if (!Number.isInteger(favouriteId)) return null;

  // Ensure there is existing boardFavourite before updating it
  let existingBoardFavourite = await getBoardFavouriteById(boardFavouriteId);
  if (!existingBoardFavourite) {
    console.log("BoardFavourite (" + boardFavouriteId + ") not found.");
    return null;
  }

  // Ensure there is existing board before updating it
  let existingBoard = null;
  if (boardId != -1) {
    existingBoard = await BoardService.getBoardById(boardId);
    if (!existingBoard) {
      console.log("Board (" + boardId + ") not found.");
      return null;
    }
  }

  // Ensure there is existing favourite before updating it
  let existingFavourite = null;
  if (favouriteId != -1) {
    existingFavourite = await FavouriteService.getFavouriteById(favouriteId);
    if (!existingFavourite) {
      console.log("Favourite (" + favouriteId + ") not found.");
      return null;
    }
  }

  // Process input parameters and replace existing data if necessary
  if (existingBoard) {
    existingBoardFavourite.boardId = existingBoard.boardId;
  }
  if (existingFavourite) {
    existingBoardFavourite.favouriteId = existingFavourite.favouriteId;
  }

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await BoardFavouriteModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await BoardFavouriteModel.update(
      {
        boardId: existingBoard.boardId,
        favouriteId: existingFavourite.favouriteId,
        updatedAt: Date.now(),
      },
      {
        where: { boardFavouriteId: boardFavouriteId },
        transaction: dbTransaction,
      }
    );

    await dbTransaction.commit();

    existingBoardFavourite.board = existingBoard;
    existingBoardFavourite.favourite = existingFavourite;

    // Return result back to caller
    if (result) {
      if (result && result.length > 0 && result[0] != 0) {
        return existingBoardFavourite;
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

const getBoardFavouriteById = async (boardFavouriteId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(boardFavouriteId)) return null;

  // Call corresponding SQL query
  let retrievedBoardFavourite = await BoardFavouriteModel.findOne({
    where: { boardFavouriteId: boardFavouriteId },
  });

  const existingBoard = await BoardService.getBoardById(
    retrievedBoardFavourite.boardId
  );
  if (existingBoard) {
    retrievedBoardFavourite.board = existingBoard;
  }

  const existingFavourite = await FavouriteService.getFavouriteById(
    retrievedBoardFavourite.favouriteId
  );
  if (existingFavourite) {
    retrievedBoardFavourite.favourite = existingFavourite;
  }

  // Return result back to caller
  if (retrievedBoardFavourite) {
    return retrievedBoardFavourite;
  } else {
    return null;
  }
};

const getAllBoardFavourites = async (boardId = -1, favouriteId = -1) => {
  // Ensure valid input parameters
  if (!Number.isInteger(boardId)) return null;
  if (!Number.isInteger(favouriteId)) return null;

  // Craft filter condition
  let whereCondition = {};
  if (boardId != -1) {
    whereCondition.boardId = boardId;
  }
  if (favouriteId != -1) {
    whereCondition.favouriteId = favouriteId;
  }

  // Call corresponding SQL query
  let retrievedBoardFavourites = await BoardFavouriteModel.findAll({
    where: whereCondition,
  });

  // Return result back to caller
  if (retrievedBoardFavourites && retrievedBoardFavourites.length > 0) {
    return retrievedBoardFavourites;
  } else {
    return null;
  }
};

const deleteBoardFavouriteById = async (boardFavouriteId) => {
  // Ensure valid input parameters
  if (!Number.isInteger(boardFavouriteId)) return false;

  // Start DB transaction to rollback save in case of query error
  const dbTransaction = await BoardFavouriteModel.sequelize.transaction();

  try {
    // Call corresponding SQL query
    let result = await BoardFavouriteModel.destroy({
      where: { boardFavouriteId: boardFavouriteId },
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
  createBoardFavourite,
  updateBoardFavourite,
  getBoardFavouriteById,
  getAllBoardFavourites,
  deleteBoardFavouriteById,
};
