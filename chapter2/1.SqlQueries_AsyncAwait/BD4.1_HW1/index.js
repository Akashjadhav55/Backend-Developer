const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW1 Template" });
});

// YOUR ENDPOINTS GO HERE
// Exercise 1: Fetch All Books
// http://localhost:3000/books
let fetchAllBooks = async ( ) => {
  let query = 'SELECT * FROM books '
  let res =  await db.all(query, [])
  return { books : res }
}
app.get("/books", async (req ,res) => {
  let result = await fetchAllBooks() 
  res.status(200).json(result)
})

// Exercise 2: Fetch Books by Author
// http://localhost:3000/books/author/George%20Orwell
let fetchBooksByAuthor = async (author ) => {
  let query = 'SELECT * FROM books WHERE author = ?'
  let res =  await db.all(query, [author])
  return { books : res }
}
app.get("/books/author/:author", async (req ,res) => {
  let author = req.params.author
  let result = await fetchBooksByAuthor(author) 
  res.status(200).json(result)
})

// Exercise 3: Fetch Books by Genre
// http://localhost:3000/books/genre/Fiction
let fetchBooksByGenre = async (genre) => {
  let query = 'SELECT * FROM books WHERE genre = ?'
  let res =  await db.all(query, [genre])
  return { books : res }
}
app.get("/books/genre/:genre", async (req ,res) => {
  let genre = req.params.genre
  let result = await fetchBooksByGenre(genre) 
  res.status(200).json(result)
})


// Exercise 4: Fetch Books by Publication Year//
// http://localhost:3000/books/publication_year/1960
let fetchBooksByPublicationYear = async (publication_year) => {
  let query = 'SELECT * FROM books WHERE publication_year = ?'
  let response =  await db.all(query, [publication_year])
  return { books : response }
}
app.get("/books/publication_year/:year", async (req ,res) => {
  let publication_year = req.params.year
  let result = await fetchBooksByPublicationYear(publication_year) 
  res.status(200).json(result)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
