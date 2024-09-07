let { sequelize, DataTypes } = require('../lib/')

let recipes = sequelize.define("recipes",{
  title: DataTypes.TEXT,
  chef: DataTypes.TEXT,
  cuisine: DataTypes.TEXT,
  preparationTime: DataTypes.NUMBER,
  instructions : DataTypes.TEXT,
})


module.exports = {
  recipes
}


