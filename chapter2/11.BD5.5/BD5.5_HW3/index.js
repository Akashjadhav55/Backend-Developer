let express = require("express")
const { favorite } = require("./model/favorite.model")
const { sequelize } = require("./lib")
const { users } = require("./model/user.model")
const { recipes } = require("./model/recipe.model")
const { Op } = require("@sequelize/core")
let app = express()
app.use(express.json())



let recipeData = [
  {
    title: 'Spaghetti Carbonara',
    chef: 'Chef Luigi',
    cuisine: 'Italian',
    preparationTime: 30,
    instructions: 'Cook spaghetti. In a bowl, mix eggs, cheese, and pepper. Combine with pasta and pancetta.',
  },
  {
    title: 'Chicken Tikka Masala',
    chef: 'Chef Anil',
    cuisine: 'Indian',
    preparationTime: 45,
    instructions: 'Marinate chicken in spices and yogurt. Grill and serve with a creamy tomato sauce.',
  },
  {
    title: 'Sushi Roll',
    chef: 'Chef Sato',
    cuisine: 'Japanese',
    preparationTime: 60,
    instructions: 'Cook sushi rice. Place rice on nori, add fillings, roll, and slice into pieces.',
  },
  {
    title: 'Beef Wellington',
    chef: 'Chef Gordon',
    cuisine: 'British',
    preparationTime: 120,
    instructions: 'Wrap beef fillet in puff pastry with mushroom duxelles and bake until golden.',
  },
  {
    title: 'Tacos Al Pastor',
    chef: 'Chef Maria',
    cuisine: 'Mexican',
    preparationTime: 50,
    instructions: 'Marinate pork in adobo, grill, and serve on tortillas with pineapple and cilantro.',
  },
]



app.get("/seed_db", async (req ,res) => {
  try {
    await sequelize.sync({ force : true })
    await users.create({
      username: 'foodlover',
      email: 'foodlover@example.com',
      password: 'securepassword',
    })
    await recipes.bulkCreate(recipeData)
    return res.status(200).json({ message : "Database Seeding Successfully" })
  } catch (error) {
    res.status(500).json({ message: err.message })
  }
})





let cookRecipe = async () =>{
  let res = await favorite.findAll()
  return { result : res }
}
app.get("/user", async (req ,res) => {
  try{
    let response = await cookRecipe()
    res.status(200).json(response)
  }catch (err){
    return res.status(500).json({ message : err.message })
  }
})


// Exercise 1: Favorite a Recipe
// http://localhost:3000/users/1/favorite?recipeId=2
let favoriteRecipe = async (data) => {
  let res = await favorite.create({
    userId : data.userId,
    recipeId : data.recipeId
  })

  return { message : "Add Favorite Recipe", res }
}
app.get("/users/:id/favorite", async (req ,res) => {
  try {
    let userId = req.params.id;
    let recipeId = req.query.recipeId

    let response = await favoriteRecipe({userId,recipeId});
    
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: err.message })
  }
})

// Exercise 2: Unfavorite a Recipe
// http://localhost:3000/users/1/unfavorite?recipeId=2
let unfavoriteRecipe = async (userId, recipeId) => {
  let res = await favorite.destroy({
    where : {
      userId: userId,
      recipeId : recipeId
    }
  })
  if(res === 0) return {}
  return { message : "Recipe unfavorited"  }
}
app.get("/users/:id/unfavorite", async (req ,res) => {
  try {
    let userId = req.params.id;
    let recipeId = req.query.recipeId

    let response = await unfavoriteRecipe(userId,recipeId);
    if(!response.message){
      return res.status(404).json({ message : "This recipe is not your favorite list"})
    }
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: err.message })
  }
})


// Exercise 3: Get All Favorited Recipes
// http://localhost:3000/users/1/favorites
let getAllFavoritedRecipes  = async (userId) => {
  let res = await favorite.findAll({
    where : { userId },
    attributes : [ "recipeId" ]
  })

  let RecipeIds = [];
  for(let i=0; i<res.length; i++){
    RecipeIds.push(res[i].recipeId)
  }
  console.log(RecipeIds)
  let favoriteRecipes = await recipes.findAll({
    where : { id :{ [ Op.in ] : RecipeIds } }
  })
  return { favoriteRecipes }
}

app.get("/users/:id/favorites", async (req ,res) => {
  try {
    let userId = req.params.id;

    let response = await getAllFavoritedRecipes (userId);
    if(response.favoriteRecipes.length === 0){
      return res.status(404).json({ message : "Recipe Not Found"})
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})




app.listen(3000,() => {
  console.log("server is running on https:localhost:3000")
})