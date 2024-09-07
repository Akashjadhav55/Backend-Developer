const { DataTypes } = require("sequelize")
const { sequelize } = require("../lib")
const { tickets } = require("./ticket.model")
const agents = require("./agent.model")


let ticketAgent = sequelize.define('ticketAgent',{
  ticketId : {
    type : DataTypes.INTEGER,
    references : {
      model : tickets,
      key : "ticketId"
    }
  },
  agentId : {
    type : DataTypes.INTEGER,
    references : {
      model : agents,
      key : "agentId"
    }
  }
})

tickets.belongsToMany(agents, { through : "ticketAgent" })
agents.belongsToMany(tickets, { through : "ticketAgent" })

module.exports = { ticketAgent }


