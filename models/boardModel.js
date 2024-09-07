const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class BoardModel extends Model {}

// Sequelize will create this table if it doesn't exist on startup
BoardModel.init(
  {
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
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
    modelName: "boards", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = BoardModel;
