let { DataTypes, sequelize } = require("../lib/")


let users = sequelize.define( "users", {
  username: {
    type :DataTypes.TEXT,
    allowNull : false,
    unique : true
  },
  email: {
    type : DataTypes.TEXT,
    allowNull : false,
    unique : true
  },
  password: {
    type : DataTypes.TEXT,
    allowNull : false
  },
})


module.exports = { users }















