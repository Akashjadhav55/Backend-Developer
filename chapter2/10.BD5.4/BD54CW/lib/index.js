let { Sequelize, DataTypes  } = require("sequelize")


let sequelize = new Sequelize({
  dialect : "sqlite",
  storage : "./database.sqlite"
})

module.exports = {
  sequelize,
  DataTypes
}