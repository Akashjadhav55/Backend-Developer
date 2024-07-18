const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// Connect to SQLite database
(async () => {
  db = await open({ filename: "database.sqlite", driver: sqlite3.Database });
  if (db) console.log("Connected to the SQLite database.");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 CW - SQL Queries & async/await" });
});

// YOUR ENPOINTS GO HERE
// Exercise 1: Fetch all movies
let fetchAllMovies = async () => {
  let query = 'SELECT * FROM movies';
  let response = await db.all(query, []);
  return { movies: response };
};
app.get('/movies', async (req, res) => {
  let result = await fetchAllMovies();
  res.status(200).json(result);
});

// Exercise 2: Fetch all movies by genre
// http://localhost:3000/movies/genre/Biography
let fetchMovieByGenre = async (genre) => {
  let query = 'SELECT * FROM movies WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { movies: response };
};

app.get('/movies/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let result = await fetchMovieByGenre(genre);
  res.status(200).json(result);
});

// Exercise 3: Fetch movie details by ID
// http://localhost:3000/movies/details/3
let fetchMovieById = async (id) => {
  let query = 'SELECT * FROM movies WHERE id = ?';
  let response = await db.all(query, [id]);
  return { movies: response };
};
app.get('/movies/details/:id', async (req, res) => {
  let id = req.params.id;
  let result = await fetchMovieById(id);
  res.status(200).json(result);
});


// Exercise 4: Fetch movie details by release_year
// http://localhost:3000/movies/release_year/2016
let fetchMovieByReleaseYear = async (release_year) => {
  let query = 'SELECT * FROM movies WHERE release_year = ?';
  let response = await db.all(query, [release_year]);
  return { movie: response };
}
app.get('/movies/release_year/:year', async (req, res) => {
  let release_year = req.params.year;
  let result = await fetchMovieByReleaseYear(release_year);
  res.status(200).json(result);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
