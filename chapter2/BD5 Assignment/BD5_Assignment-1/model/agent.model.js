const { DataTypes } = require("sequelize");
const { sequelize } = require("../lib");

let agents = sequelize.define('agents',{
    id : {
    type : DataTypes.INTEGER,
    allowNull : false,
    primaryKey : true,
    unique : true,
      autoIncrement :true,
  },
  name : {
    type : DataTypes.STRING,
    allowNull : false,
  },
  email : {
    type : DataTypes.STRING,
    allowNull : false
  }
})

module.exports = agents