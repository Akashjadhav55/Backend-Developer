const { sequelize, DataTypes } = require("../lib");
const { recipes } = require("./recipe.model");
const { users } = require("./user.model");


let favorite = sequelize.define("favorite",{
  userId : {
   type : DataTypes.INTEGER,
   references : {
     model : users,
     key : "id"
   }
  } ,
  recipeId : {
    type : DataTypes.INTEGER,
    references : {
      model : recipes,
      key : "id"
    }
  }

})

users.belongsToMany(recipes,{ through : "favorite" })
recipes.belongsToMany(users, { through : "favorite" })

module.exports = { favorite }