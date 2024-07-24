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
  res.status(200).json({ message: "Hello World" });
});

// Question 1: Fetch All Movieshttp://localhost:3000/movies
let fetchAllMovies = async () => {
  let query = "SELECT * FROM movies";
  let response = await db.all(query, []);
  return { movies: response };
};
app.get("/movies", async (req, res) => {
  try {
    let result = await fetchAllMovies();
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "No Movies Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// Question 2: Fetch All Movies by Actor
// <http://localhost:3000/movies/actor/Salman%20Khan>

let filterByActor = async (actor) => {
  let query = "SELECT * FROM movies WHERE actor = ?";
  let response = await db.all(query, [actor]);
  return { movies: response };
};
app.get("/movies/actor/:actor", async (req, res) => {
  try {
    let actor = req.params.actor
    let result = await filterByActor(actor);
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "No Movies Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


//Question 3: Fetch All Movies by Director
// movies/director/S.S.%20Rajamouli

let filterByDirector = async (director) => {
  let query = "SELECT * FROM movies WHERE director = ?";
  let response = await db.all(query, [director]);
  return { movies: response };
};
app.get("/movies/director/:director", async (req, res) => {
  try {
    let director = req.params.director
    let result = await filterByDirector(director);
    if (result.movies.length === 0) {
      return res.status(404).json({ message: "DATA NOT FOUND OF"+ director.toUpperCase });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
