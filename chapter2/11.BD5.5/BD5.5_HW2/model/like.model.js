let { DataTypes, sequelize } = require("../lib/")

let { movies } = require("./movie.model.js")
let { users } = require("./user.model.js")

let like = sequelize.define("like", {
  userId : {
    type : DataTypes.INTEGER,
    references : {
      model : users,
      key : "id"
    }
  },
  movieId : {
    type : DataTypes.INTEGER,
    references : {
      model : movies,
      key : "id"
    }
  }
})

users.belongsToMany(movies, { through : "like" })
movies.belongsToMany(users, { through : "like" })

module.exports = { like }