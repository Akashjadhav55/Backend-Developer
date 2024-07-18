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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
