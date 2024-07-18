let express = require("express");
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
  res.status(200).json({ message: "BD4.2 CW Template" });
});

// Exercise 1: Get all books
// http://localhost:3000/books
let fetchBooks = async () => {
  let query = "SELECT * FROM books";
  let response = await db.all(query, []);
  return { books: response };
};
app.get("/books", async (req, res) => {
  try {
    let result = await fetchBooks();
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No Books Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


//Exercise 2: Fetch Books by Author
// http://localhost:3000/books/author/George%20Orwell
let getAllBooksByAuthor = async (author) => {
  let query = "SELECT * FROM books WHERE author = ?";
  let response = await db.all(query, [author]);
  return { books: response };
};
app.get("/books/author/:author", async (req, res) => {
  try {
    let author = req.params.author
    let result = await getAllBooksByAuthor(author);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No Books Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// Exercise 3: Fetch Books by Genre
// http://localhost:3000/books/genre/Fiction
let getAllBooksByGenre = async (genre) => {
  let query = "SELECT * FROM books WHERE genre = ?";
  let response = await db.all(query, [genre]);
  return { books: response };
};
app.get("/books/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre
    let result = await getAllBooksByGenre(genre);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No Books Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 4: Fetch Books by Publication Year
// http://localhost:3000/books/publication_year/1960
let getAllBooksByPublicationYear = async (publication_year) => {
  let query = "SELECT * FROM books WHERE publication_year = ?";
  let response = await db.all(query, [publication_year]);
  return { books: response };
};
app.get("/books/publication_year/:year", async (req, res) => {
  try {
    let publication_year = req.params.year
    let result = await getAllBooksByPublicationYear(publication_year);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "No Books Data Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
