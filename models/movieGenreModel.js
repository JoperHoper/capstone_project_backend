const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class MovieGenreModel extends Model {}

// Sequelize will create this table if it doesn't exist on startup
MovieGenreModel.init(
  {
    movieGenreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    movie: {
      type: DataTypes.VIRTUAL,
      required: false,
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    genre: {
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
    modelName: "rs_movie_genre", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = MovieGenreModel;
