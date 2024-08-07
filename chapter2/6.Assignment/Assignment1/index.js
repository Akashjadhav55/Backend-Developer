let express = require("express");
let sqlite3 = require("sqlite3").verbose()
let { open } = require("sqlite")

let app = express()
let PORT = process.env.PORT  || 3000;
let db;

(async () => {
  db = await open({
    filename : "database.sqlite",
    driver : sqlite3.Database
  })
})()

app.get("/",(req , res) => {
  return res.json({ message : "Backend Developer" })
})

// Exercise 1: Get All Restaurants
// http://localhost:3000/restaurants
let fetchAllRecipes = async () => {
  let query = "SELECT * FROM restaurants"
  let response = await db.all(query, []);
  return { restaurant : response }
}
app.get("/restaurants", async (req ,res)=>{
  try{
  let result = await fetchAllRecipes()
    if(result.restaurant.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 2: Get Restaurant by ID
// http://localhost:3000/restaurants/details/1
let fetchRestaurantData = async (id) => {
  let query = "SELECT * FROM restaurants WHERE id = ?"
  let response = await db.all(query, [id]);
  return { restaurant : response }
}
app.get("/restaurants/details/:id", async (req ,res)=>{
  let id = req.params.id
  try{
  let result = await fetchRestaurantData(id)
    if(result.restaurant.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 3: Get Restaurants by Cuisine
// http://localhost:3000/restaurants/cuisine/Indian

let fetchRestaurantByCuisine = async (cuisine) => {
  let query = "SELECT * FROM restaurants WHERE cuisine = ?"
  let response = await db.all(query, [cuisine]);
  return { restaurant : response }
}
app.get("/restaurants/cuisine/:cuisine", async (req ,res)=>{
  let cuisine = req.params.cuisine
  try{
  let result = await fetchRestaurantByCuisine(cuisine)
    if(result.restaurant.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


// Exercise 4: Get Restaurants by Filter
// http://localhost:3000/restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false
let fetchRestaurantByFilter = async (isVeg,hasOutdoorSeating, isLuxury) => {
  let query = "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?"
  let response = await db.all(query, [isVeg,hasOutdoorSeating,isLuxury]);
  return { restaurant : response }
}
app.get("/restaurants/filter", async (req ,res)=>{
  let isVeg = req.query.isVeg
  let hasOutdoorSeating = req.query.hasOutdoorSeating
  let isLuxury = req.query.isLuxury
  try{
  let result = await fetchRestaurantByFilter(isVeg,hasOutdoorSeating,isLuxury)
    if(result.restaurant.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


//  Exercise 5: Get Restaurants Sorted by Rating
// http://localhost:3000/restaurants/sort-by-rating
let fetchRestaurantSortByRating = async () => {
  let query = "SELECT * FROM restaurants ORDER BY rating DESC"
  let response = await db.all(query, []);
  return { restaurant : response }
}
app.get("/restaurants/sort-by-rating", async (req ,res)=>{
  try{
  let result = await fetchRestaurantSortByRating()
    if(result.restaurant.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 6: Get All Dishes
// http://localhost:3000/dishes
let fetchDishes = async () => {
  let query = "SELECT * FROM dishes"
  let response = await db.all(query, []);
  return { dishes : response }
}
app.get("/dishes", async (req ,res)=>{
  try{
  let result = await fetchDishes()
    if(result.dishes.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 7: Get Dish by ID
//  dishes/details/1
let fetchDishesByID = async (id) => {
  let query = "SELECT * FROM dishes WHERE id = ?"
  let response = await db.all(query, [id]);
  return { dish : response }
}
app.get("/dishes/details/:id", async (req ,res)=>{
  let id = req.params.id
  try{
  let result = await fetchDishesByID(id)
    if(result.dish.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 8: Get Dishes by Filter
// http://localhost:3000/dishes/filter?isVeg=true
let fetchDishesByFilter = async (isVeg) => {
  let query = "SELECT * FROM dishes WHERE isVeg = ?"
  let response = await db.all(query, [isVeg]);
  return { dishes : response }
}
app.get("/dishes/filter", async (req ,res)=>{
  let isVeg = req.query.isVeg
  try{
  let result = await fetchDishesByFilter(isVeg)
    if(result.dishes.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


// Exercise 9: Get Dishes Sorted by Price
// http://localhost:3000/dishes/sort-by-price
let fetchRestaurantSortByPrice = async () => {
  let query = "SELECT * FROM dishes ORDER BY price"
  let response = await db.all(query, []);
  return { dishes : response }
}
app.get("/dishes/sort-by-price", async (req ,res)=>{
  try{
  let result = await fetchRestaurantSortByPrice()
    if(result.dishes.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log("server is running on https://localhost:"+PORT)
})