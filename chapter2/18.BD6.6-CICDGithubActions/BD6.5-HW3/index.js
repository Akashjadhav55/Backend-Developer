const express = require("express");
const cors = require("cors");
const { getAllBooks, getBooksById } = require("./controllers/data");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

// Exercise 1: Retrieve All Books
app.get('/books', async (req ,res) => {
  let response = await getAllBooks()
  res.json(response)
})

//Exercise 2: Retrieve Book by ID
app.get('/books/details/:id', async (req ,res) => {
  let response = await getBooksById(parseInt(req.params.id))
  res.json(response)
})


module.exports = { app }
