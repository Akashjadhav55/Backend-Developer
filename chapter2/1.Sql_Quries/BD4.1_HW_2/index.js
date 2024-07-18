const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW2 Template" });
});

// YOUR ENDPOINTS GO HERE
// Exercise 1: Retrieve All Tracks
// http://localhost:3000/tracks
let fetchAllTracks = async ( ) => {
  let query = 'SELECT * FROM tracks'
  let res =  await db.all(query, [])
  return { tracks : res }
}
app.get("/tracks", async (req ,res) => {
  let result = await fetchAllTracks() 
  res.status(200).json(result)
})

// Exercise 2: Retrieve Tracks by Artist
// http://localhost:3000/tracks/artist/Arijit%20Singh
let fetchTracksByArtist = async (artist ) => {
  let query = 'SELECT * FROM tracks WHERE artist = ?'
  let res =  await db.all(query, [artist])
  return { tracks : res }
}
app.get("/tracks/artist/:artist", async (req ,res) => {
  let artist = req.params.artist
  let result = await fetchTracksByArtist(artist) 
  res.status(200).json(result)
})


// Exercise 3: Retrieve Tracks by Genre
// http://localhost:3000/tracks/genre/Romantic
let fetchTracksByGenre = async (genre ) => {
  let query = 'SELECT * FROM tracks WHERE genre = ?'
  let res =  await db.all(query, [genre])
  return { tracks : res }
}
app.get("/tracks/genre/:genre", async (req ,res) => {
  let genre = req.params.genre
  let result = await fetchTracksByGenre(genre) 
  res.status(200).json(result)
})

//Exercise 4: Retrieve Tracks by Release Year
// http://localhost:3000/tracks/release_year/2019
let fetchTracksByReleaseYear = async (release_year) => {
  let query = 'SELECT * FROM tracks WHERE release_year = ?'
  let res =  await db.all(query, [release_year])
  return { tracks : res }
}
app.get("/tracks/release_year/:year", async (req ,res) => {
  let year = req.params.year
  let result = await fetchTracksByReleaseYear(year) 
  res.status(200).json(result)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});