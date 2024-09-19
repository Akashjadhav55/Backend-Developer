const express = require("express");
const cors = require("cors");
const { getAllMovies, getMoviesById } = require("./controllers/data");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

// Exercise 1: Retrieve All Movies
app.get('/movies', async (req ,res) => {
  let response = await getAllMovies()
  res.json({response})
})

app.get('/movies/details/:id', (req ,res) => {
  let response = getMoviesById(parseInt(req.params.id))
  res.json({response})
})


module.exports = { app }
