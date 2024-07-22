let express = require("express")
let app = express()
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
let port = 3000;


const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "tracks_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW2 Template" });
});


// Exercise 1: Retrieve All Tracks
// http://localhost:3000/tracks
let getAllTracks = async () => {
  let query = "SELECT * FROM tracks";
  let response = await db.all(query, []);
  return { tracks: response };
};
app.get("/tracks", async (req, res) => {
  try {
    let result = await getAllTracks();
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No Tracks Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Retrieve Tracks by Artist
// http://localhost:3000/tracks/artist/Arijit%20Singh
let getTracksByArtist = async (artist) => {
  let query = "SELECT * FROM tracks WHERE artist = ?";
  let response = await db.all(query, [artist]);
  return { tracks: response };
};
app.get("/tracks/artist/:artist", async (req, res) => {
  try {
    let artist = req.params.artist
    let result = await getTracksByArtist(artist);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No Tracks Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 3: Retrieve Tracks by Genre
//http://localhost:3000/tracks/genre/Romantic

let getTracksByGenre = async (genre) => {
  let query = "SELECT * FROM tracks WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { tracks: response };
};
app.get("/tracks/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre
    let result = await getTracksByGenre(genre);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No Tracks Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// Exercise 4: Retrieve Tracks by Release Year
// http://localhost:3000/tracks/release_year/2012
let getTracksByReleaseYear = async (year) => {
  let query = "SELECT * FROM tracks WHERE release_year = ?";
  let response = await db.all(query, [year]);
  return { tracks: response };
};
app.get("/tracks/release_year/:year", async (req, res) => {
  try {
    let year = req.params.year
    let result = await getTracksByReleaseYear(year);
    if (result.tracks.length === 0) {
      return res.status(404).json({ message: "No Tracks Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log("server is running on https://localhost:"+port)
})