let  { DataTypes, sequelize } = require("../lib/")

let movies = sequelize.define("movies",{
  title: DataTypes.TEXT,
    director: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  year: DataTypes.INTEGER,
  summary: DataTypes.TEXT,
})

module.exports = { movies }