const { DataTypes } = require("sequelize")
const { sequelize } = require("../lib")
const { tickets } = require("./ticket.model")
const customers = require("./customer.model")


let ticketCustomer = sequelize.define('ticketCustomer',{
  ticketId : {
    type : DataTypes.INTEGER,
    references : {
      model : tickets,
      key : "id"
    }
  },
  customerId : {
    type : DataTypes.INTEGER,
    references : {
      model : customers,
      key : "id"
    }
  }
})

tickets.belongsToMany(customers, { through : "ticketCustomer" })
customers.belongsToMany(tickets, { through : "ticketCustomer" })

module.exports = { ticketCustomer }


