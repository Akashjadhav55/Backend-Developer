let { DataTypes , Sequelize } = require("sequelize")

let sequelize = new Sequelize({
  dialect: "sqlite",
  storage : "./database.sqlite"
})

module.exports = {
  sequelize,
  DataTypes
}

