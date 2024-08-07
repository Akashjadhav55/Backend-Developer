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

// Exercise 1: Get All Games
// http://localhost:3000/games
let fetchAllGames = async () => {
  let query = "SELECT * FROM games"
  let response = await db.all(query, []);
  return { games : response }
}
app.get("/games", async (req ,res)=>{
  try{
  let result = await fetchAllGames()
    if(result.games.length === 0){
      return res.status(404).json({ message : " DATA NOT FOUND" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 2: Get Game by ID
// http://localhost:3000/games/details/1
let fetchGameByID = async (id) => {
  let query = "SELECT * FROM games WHERE id = ?"
  let response = await db.all(query, [id]);
  return { game : response }
}
app.get("/games/details/:id", async (req ,res)=>{
  let id = req.params.id
  try{
  let result = await fetchGameByID(id)
    if(result.game.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 3: Get Games by Genre
// http://localhost:3000/games/genre/FPS

let fetchGamesByGenre = async (genre) => {
  let query = "SELECT * FROM games WHERE genre = ?"
  let response = await db.all(query, [genre]);
  return { games : response }
}
app.get("/games/genre/:genre", async (req ,res)=>{
  let genre = req.params.genre
  try{
  let result = await fetchGamesByGenre(genre)
    if(result.games.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


// Exercise 4: Get Games by Platform
// http://localhost:3000/games/platform/PC
let fetchGamesByPlatform = async (platform) => {
  let query = "SELECT * FROM games WHERE platform = ?"
  let response = await db.all(query, [platform]);
  return { games : response }
}
app.get("/games/platform/:platform", async (req ,res)=>{
  let platform = req.params.platform;
  try{
  let result = await fetchGamesByPlatform(platform)
    if(result.games.length === 0){
      return res.status(404).json({ message : "DATA NOT FOUND" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 5: Get Games Sorted by Rating
// http://localhost:3000/games/sort-by-rating
let fetchGameBySort = async () => {
  let query = "SELECT * FROM games ORDER BY rating DESC"
  let response = await db.all(query, []);
  return { games : response }
}
app.get("/games/sort-by-rating", async (req ,res)=>{
  try{
  let result = await fetchGameBySort()
    if(result.games.length === 0){
      return res.status(404).json({ message : "DATA NOT FOUND" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


// Exercise 6: Get All Players
// http://localhost:3000/players
let fetchPlayers = async () => {
  let query = "SELECT * FROM players"
  let response = await db.all(query, []);
  return { players : response }
}
app.get("/players", async (req ,res)=>{
  try{
  let result = await fetchPlayers()
    if(result.players.length === 0){
      return res.status(404).json({ message : "DATA NOT FOUND " })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 7: Get Players by ID
//  http://localhost:3000/players/details/1
let fetchPlayersByID = async (id) => {
  let query = "SELECT * FROM players WHERE id = ?"
  let response = await db.all(query, [id]);
  return { players : response }
}
app.get("/players/details/:id", async (req ,res)=>{
  let id = req.params.id
  try{
  let result = await fetchPlayersByID(id)
    if(result.players.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 8: Get Players by Platform
// http://localhost:3000/players/platform/PC
let fetchPlayersByPlatform = async (platform) => {
  let query = "SELECT * FROM players WHERE platform = ?"
  let response = await db.all(query, [platform]);
  return { players : response }
}
app.get("/players/platform/:platform", async (req ,res)=>{
  let platform = req.params.platform
  try{
  let result = await fetchPlayersByPlatform(platform)
    if(result.players.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


// Exercise 9: Get Players Sorted by Rating
// http://localhost:3000/players/sort-by-rating
let fetchPlayersBySorting = async () => {
  let query = "SELECT * FROM players ORDER BY rating DESC"
  let response = await db.all(query, []);
  return { players : response }
}
app.get("/players/sort-by-rating", async (req ,res)=>{
  try{
  let result = await fetchPlayersBySorting()
    if(result.players.length === 0){
      return res.status(404).json({ message : "DATA NOT FOUND" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


// Exercise 10: Get All Tournaments
// http://localhost:3000/tournaments
let fetchTournaments = async () => {
  let query = "SELECT * FROM tournaments"
  let response = await db.all(query, []);
  return { tournaments : response }
}
app.get("/tournaments", async (req ,res)=>{
  try{
  let result = await fetchTournaments()
    if(result.tournaments.length === 0){
      return res.status(404).json({ message : "DATA NOT FOUND " })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 11: Get Tournament by ID
// http://localhost:3000/tournaments/details/1
let fetchTournamentsByID = async (id) => {
  let query = "SELECT * FROM tournaments WHERE id = ?"
  let response = await db.all(query, [id]);
  return { tournaments : response }
}
app.get("/tournaments/details/:id", async (req ,res)=>{
  let id = req.params.id
  try{
  let result = await fetchTournamentsByID(id)
    if(result.tournaments.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 12: Get Tournaments by Game ID
// http://localhost:3000/tournaments/game/1
let fetchTournamentsByGameID = async (id) => {
  let query = "SELECT * FROM tournaments WHERE gameId = ?"
  let response = await db.all(query, [id]);
  return { tournaments : response }
}
app.get("/tournaments/game/:id", async (req ,res)=>{
  let id = req.params.id
  try{
  let result = await fetchTournamentsByGameID(id)
    if(result.tournaments.length === 0){
      return res.status(404).json({ message : "NOT FOUND DATA" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 13: Get Tournaments Sorted by Prize Pool
// http://localhost:3000/tournaments/sort-by-prize-pool
let fetchTournamentsSortByPrizepool = async () => {
  let query = "SELECT * FROM tournaments ORDER BY prizePool DESC"
  let response = await db.all(query, []);
  return { tournaments : response }
}
app.get("/tournaments/sort-by-prize-pool", async (req ,res)=>{
  try{
  let result = await fetchTournamentsSortByPrizepool()
    if(result.tournaments.length === 0){
      return res.status(404).json({ message : "DATA NOT FOUND " })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log("server is running on https://localhost:"+PORT)
})