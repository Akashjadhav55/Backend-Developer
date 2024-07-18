let express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 CW Template" });
});

// Exercise 1: Get all movies
// http://localhost:3000/movies
let fetchMovies = async () => {
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
};
app.get("/movies", async (req, res) => {
  try {
    let result = await fetchMovies();
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "No Movies Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Fetch movies by genre
//http://localhost:3000/movies/genre/Biography
let fetchMoviesGenre = async (genre) => {
  let query = "SELECT * FROM movies WHERE genre = ?"
  let response = await db.all(query,  [genre])
  return { movies : response }
}
app.get("/movies/genre/:genre", async (req ,res) => {
  try{
  let genre = req.params.genre
  let result = await fetchMoviesGenre(genre)
  if(result.movies.length === 0){
    return res.status(404).json({ message : "No Movies Data Found" })
  }
  res.status(200).json(result)
  } catch(error) {
    return res.status(500).json({ error : error.message })
  }
})

// Exercise 3: Fetch movie by ID
// http://localhost:3000/movies/details/2
let fetchMoviesByID = async (id) => {
  let query = "SELECT * FROM movies WHERE id = ?"
  let res = await db.all(query, [id])
  return {movies : res }
}
app.get("/movies/details/:id", async (req , res) => {
  try{
    let id = parseInt(req.params.id);
    let result = await fetchMoviesByID(id)
    if(result.movies.length === 0){
      return res.status(404).json({ message : "No Movies Data Found" })
    }
    return res.status(200).json(result)
  } catch(error) {
    return res.status(500).json({ error : error.message })
  }
})

//Exercise 4: Fetch movies by release year
//http://localhost:3000/movies/release-year/2015
let fetchMoviesByYear = async (release_year) => {
  let query = "SELECT * FROM movies WHERE release_year = ?"
  let res = await db.all(query, [release_year])
  return {movies : res }
}
app.get("/movies/release-year/:year", async (req , res) => {
  try{
    let year = parseInt(req.params.year);
    let result = await fetchMoviesByYear(year)
    if(result.movies.length === 0){
      return res.status(404).json({ message : "No Movies Data Found" })
    }
    return res.status(200).json(result)
  } catch(error) {
    return res.status(500).json({ error : error.message })
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
