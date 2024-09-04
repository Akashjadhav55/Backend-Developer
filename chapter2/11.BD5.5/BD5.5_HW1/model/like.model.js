let { DataTypes, sequelize } = require("../lib/")

let { books } = require("./book.model.js")
let { users } = require("./user.model.js")

let like = sequelize.define("like", {
  userId : {
    type : DataTypes.INTEGER,
    references : {
      model : users,
      key : "id"
    }
  },
  bookId : {
    type : DataTypes.INTEGER,
    references : {
      model : books,
      key : "id"
    }
  }
})



users.belongsToMany(books, { through : like });
books.belongsToMany(users, { through : like });






module.exports = { like }