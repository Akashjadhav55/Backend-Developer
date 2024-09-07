let { DataTypes, sequelize } = require("../lib/")

let user = require("./user.model")
let track = require("./movies.model")
const { type } = require("os")

let like = sequelize.define("like",{
    userId: {
      type : DataTypes.INTEGER,
      references :  {
        model : user,
        key: "id"
      }
    },
  trackId : {
    type: DataTypes.INTEGER,
    references:{
      model:track,
      key : "id",
    }
  }
  
})

user.belongsToMany(track, { through : like });
track.belongsToMany(user, { through : like });

module.exports = { like }