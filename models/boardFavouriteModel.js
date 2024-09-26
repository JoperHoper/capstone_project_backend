const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class BoardFavouriteModel extends Model {}

// Sequelize will create this table if it doesn't exist on startup
BoardFavouriteModel.init(
  {
    boardFavouriteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    boardId: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    board: {
      type: DataTypes.VIRTUAL,
      required: false,
    },
    favouriteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    favourite: {
      type: DataTypes.VIRTUAL,
      required: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      required: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "rs_board_favourite", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = BoardFavouriteModel;
