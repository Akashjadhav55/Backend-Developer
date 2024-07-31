 const { error } = require("console");
let express = require("express");
 let sqlite3 = require("sqlite3").verbose()
 let { open } = require("sqlite");


 let app = express()

 const PORT = process.env.PORT || 3000;
 let db;

 (async () => {
   db = await open({
     filename : "database.sqlite",
     driver : sqlite3.Database
   })
 })();


// Exercise 1: Filter Movies by Year and Actor
// http://localhost:3000/movies/year-actor?releaseYear=2019&actor=Hrithik%20Roshan

let filterByYearAndActor = async (releaseYear, actor) => {
   let query = "SELECT * FROM movies WHERE release_year = ? AND actor = ?"
  console.log(releaseYear, actor, typeof releaseYear, typeof actor)
   let response = await db.all(query, [releaseYear, actor])
   return { movies : response }
 }
 app.get("/movies/year-actor", async (req ,res) => {
    let releaseYear = req.query.releaseYear
    let actor = req.query.actor
   try{
     let result = await filterByYearAndActor(releaseYear,actor)
     if(result.movies.length === 0){
       return res.status(404).json({ message : "Sorry, no movies were found. Check your spelling or try searching for something else." })
     }
     return res.status(200).json(result)
   }
  catch(error){
     return res.status(500).json({ error: error.message })
  }
 })

// Exercise 2: Fetch Award Winning Movies
// http://localhost:3000/movies/award-winning
let filterAwardWinningMovies = async () => {
   let query = "SELECT * FROM movies WHERE rating >= 4.5 ORDER BY rating"
   let response = await db.all(query, [ ])
   return { movies : response }
 }
 app.get("/movies/award-winning", async (req ,res) => {
   try{
     let result = await filterAwardWinningMovies()
     if(result.movies.length === 0){
       return res.status(404).json({ message : "Sorry, no movies were found." })
     }
     return res.status(200).json(result)
   }
  catch(error){
     return res.status(500).json({ error: error.message })
  }
 })

// Exercise 3: Fetch Blockbuster Movies
// http://localhost:3000/movies/blockbuster
let fetchBlockbusterMovies = async () => {
   let query = "SELECT * FROM movies WHERE box_office_collection >= 100 ORDER BY box_office_collection DESC"
   let response = await db.all(query, [ ])
   return { movies : response }
 }
 app.get("/movies/blockbuster", async (req ,res) => {
   try{
     let result = await fetchBlockbusterMovies()
     if(result.movies.length === 0){
       return res.status(404).json({ message : "Sorry, no movies were found." })
     }
     return res.status(200).json(result)
   }
  catch(error){
     return res.status(500).json({ error: error.message })
  }
 })

 app.listen(PORT, () => {
   console.log(`Server is running on https://localhost:${PORT}`);
 })
