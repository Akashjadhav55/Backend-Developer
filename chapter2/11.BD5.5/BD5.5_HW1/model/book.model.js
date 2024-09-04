let  { DataTypes, sequelize } = require("../lib/")

let books = sequelize.define("books",{
  title: DataTypes.TEXT,
  author: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  year: DataTypes.INTEGER,
  summary: DataTypes.TEXT,
})

module.exports = { books }







