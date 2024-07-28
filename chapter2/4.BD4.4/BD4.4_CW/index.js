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


// Exercise 1: SELECT only id, title & release_year of all movies
// http://localhost:3000/movies
let fetchAllMovies = async () => {
  let query = "SELECT id, title, release_year FROM movies"
  let response = await db.all(query, [])
  return { movies : response }
}
app.get("/movies", async (req ,res) => {
  try{
    let result = await fetchAllMovies()
    if(result.movies.length === 0 ){
      return res.status(404).json({ message : "No movies found."})
    }
    return res.status(200).json(result)

  }catch(error){
    return res.status(500).json({ error : error.message })
  }
})

// Exercise 2: SELECT id, title, actor & release_year from all movies by an actor
// http://localhost:3000/movies/actor/Salman%20Khan

let fetchMoviesByActor = async (actor) => {
  let query = "SELECT id, actor, title, release_year FROM movies WHERE actor = ?"
  let response = await db.all(query, [actor])
  return { movies : response }
}
app.get("/movies/actor/:actor", async (req ,res) => {
  try{
    let actor = req.params.actor
    let result = await fetchMoviesByActor(actor)
    if(result.movies.length === 0 ){
      return res.status(404).json({ message : "No movies found."})
    }
    return res.status(200).json(result)

  }catch(error){
    return res.status(500).json({ error : error.message })
  }
})

// Exercise 3: SELECT id, title, director & release_year from all movies by a director
// http://localhost:3000/movies/director/Kabir%20Khan
let fetchMoviesByDirector = async (director) => {
  let query = "SELECT id,title,director, release_year FROM movies WHERE director = ?"
  let response = await db.all(query, [director])
  return { movies : response }
}
app.get("/movies/director/:director", async (req ,res) => {
  try{
    let director = req.params.director
    let result = await fetchMoviesByDirector(director)
    if(result.movies.length === 0 ){
      return res.status(404).json({ message : "No movies found."})
    }
    return res.status(200).json(result)

  }catch(error){
    return res.status(500).json({ error : error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
})
