const express = require("express");
const app = express();
// const port = 3000;

app.use(express.json());

let games = []
let tournaments = []

// Exercise 1: Add a New Game 
let validateGame = (game) => {
  if (!game.title || typeof game.title !== "string") {
    return "Title is required and should be a string";
  }
  if (!game.genre || typeof game.genre !== "string") {
    return "Genre is required and should be a string";
  }
  return null
};
app.post("/api/games", (req, res) => {
  let error = validateGame(req.body);
  if (error) return res.status(400).send(error);
  let data = { id: games.length + 1, ...req.body };
  games.push(data);
  res.status(201).json(data);
});

// Exercise 2: Add a New tournament 
let validateTournament = (tournament) => {
  if(!tournament.name || typeof tournament.name !== "string"){
    return "Name is required and should be a string"
  }
  if(!tournament.gameId || typeof tournament.gameId !== "number"){
    return "GameId is required and should be a number"
  }
  return null
}
app.post("/api/tournaments", (req, res) => {
  let error = validateTournament(req.body)
  if(error) return res.status(400).send(error)
  let data = { id: tournaments.length + 1, ...req.body }
  tournaments.push(data)
  res.status(201).json(data)
})


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = { app, validateGame, validateTournament }