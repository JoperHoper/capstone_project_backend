const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class UserModel extends Model {}

// Sequelize will create this table if it doesn't exist on startup
UserModel.init(
  {
    userId: {
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
      required: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      required: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    password: {
      type: DataTypes.STRING,
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
    modelName: "users", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = UserModel;
