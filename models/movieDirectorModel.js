const { DataTypes, Model } = require("sequelize");
const dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class MovieDirectorModel extends Model {}

// Sequelize will create this table if it doesn't exist on startup
MovieDirectorModel.init(
  {
    movieDirectorId: {
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
    directorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    director: {
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
    modelName: "rs_movie_director", // use lowercase plural format
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = MovieDirectorModel;
