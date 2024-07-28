let express = require("express");
let sqlite3 = require("sqlite3").verbose()
let { open } = require("sqlite")

let app = express()
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename : "database.sqlite",
    driver : sqlite3.Database,
  });
})();

// Exercise 1: Fetch All Recipes by Cuisine
// <http://localhost:3000/recipes/cuisine/Italian

let filterByCuisine = async (cuisine) => {
  let query = "SELECT * FROM recipes WHERE cuisine = ?"
  let response = await db.all(query, [cuisine])
  return { recipes : response }
}

app.get("/recipes/cuisine/:cuisine", async (req, res) => {
  try{
    let cuisine = req.params.cuisine;
    let result = await filterByCuisine(cuisine)
    if(result.recipes.length === 0){
      return res.status(404).json({ mesaage : "Data Not Found"})
    }
    res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


//Exercise 2: Fetch All Recipes by Main Ingredient
// <http://localhost:3000/recipes/main_ingredient/Chicken
let filterByMainIngredient = async (ingredient) => {
  let query = "SELECT * FROM recipes WHERE main_ingredient = ?"
  let response = await db.all(query, [ingredient])
  return { recipes : response }
}

app.get("/recipes/main_ingredient/:main_ingredient", async (req, res) => {
  try{
    let ingredient = req.params.main_ingredient;
    let result = await filterByMainIngredient(ingredient)
    if(result.recipes.length === 0){
      return res.status(404).json({ mesaage : "Data Not Found"})
    }
    res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 3: Fetch All Recipes by Preparation Time
// <http://localhost:3000/recipes/preparation_time/30
let filterByPreparationTime = async (preparation_time) => {
  let query = "SELECT * FROM recipes WHERE preparation_time <= ? "
  let response = await db.all(query, [preparation_time])
  return { recipes : response }
}

app.get("/recipes/preparation_time/:preparation_time", async (req, res) => {
  try{
    let preparation_time = parseInt(req.params.preparation_time);
    let result = await filterByPreparationTime(preparation_time)
    if(result.recipes.length === 0){
      return res.status(404).json({ mesaage : "Data Not Found"})
    }
    res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 4: Fetch All Recipes by Difficulty
// <http://localhost:3000/recipes/difficulty/Easy
let filterByDifficulty = async (difficulty) => {
  let query = "SELECT * FROM recipes WHERE difficulty = ? "
  let response = await db.all(query, [difficulty])
  return { recipes : response }
}

app.get("/recipes/difficulty/:difficulty", async (req, res) => {
  try{
    let difficulty = req.params.difficulty;
    let result = await filterByDifficulty(difficulty)
    if(result.recipes.length === 0){
      return res.status(404).json({ mesaage : "Data Not Found"})
    }
    res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 5: Fetch All Recipes by Vegetarian Status
// <http://localhost:3000/recipes/vegetarian/true

let filterByVegetarian = async (vegetarian) => {
  let query = "SELECT * FROM recipes WHERE vegetarian = ? "
  let response = await db.all(query, [vegetarian])
  return { recipes : response }
}

app.get("/recipes/vegetarian/:vegetarian", async (req, res) => {
  try{
    let vegetarian = req.params.vegetarian;
    let result = await filterByVegetarian(vegetarian)
    if(result.recipes.length === 0){
      return res.status(404).json({ mesaage : "Data Not Found"})
    }
    res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})



app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
})
