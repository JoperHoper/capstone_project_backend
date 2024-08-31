const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class FavouriteModel extends Model {}

// Sequelize will create this table if it doesn't exist on startup
FavouriteModel.init(
  {
    favouriteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    user: {
      type: DataTypes.VIRTUAL,
      required: false,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    movie: {
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
    modelName: "favourites", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = FavouriteModel;
