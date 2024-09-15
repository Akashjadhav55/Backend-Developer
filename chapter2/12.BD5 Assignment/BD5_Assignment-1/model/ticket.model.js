const { DataTypes } = require("sequelize")
const { sequelize } = require("../lib")



let tickets = sequelize.define("tickets", {
  id: {
    type : DataTypes.INTEGER,
    allowNull : false,
    primaryKey : true,
    unique : true,
    autoIncrement : true,
  },
  title :{
    type: DataTypes.STRING,
    allowNull: false,
  },
  description : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerId : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agentId : {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}) 

module.exports = { tickets }