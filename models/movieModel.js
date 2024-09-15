const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class MovieModel extends Model {}

// Sequelize will create this table if it doesn't exist on startup
MovieModel.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    movieTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: true,
      required: false,
    },
    posterUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      required: false,
    },
    trailerUrl: {
      type: DataTypes.INTEGER,
      allowNull: true,
      required: false,
    },
    runningTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
      required: false,
    },
    genres: {
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
    modelName: "movies", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = MovieModel;
