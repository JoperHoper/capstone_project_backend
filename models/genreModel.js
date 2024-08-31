const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class GenreModel extends Model {}

// Sequelize will create this table if it doesn't exist on startup
GenreModel.init(
  {
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    genre: {
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
    modelName: "genres", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = GenreModel;
