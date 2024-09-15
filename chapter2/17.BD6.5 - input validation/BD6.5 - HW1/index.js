const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());


// Exercise 1: Add a New User
let validateUser = (user) => {
  if (!user.name || typeof user.name !== "string") {
    return "Name is required and should be a string";
  }
  if (!user.email || typeof user.email !== "string") {
    return "Email is required and should be a string";
  }
  return null
};
app.post("/api/users", (req, res) => {
  let error = validateUser(req.body);
  if (error) return res.status(400).send(error);
  let data = { id: users.length + 1, ...req.body };
  users.push(data);
  res.status(201).json(data);
});


// Exercise 2: Add a New Book
let validateBook = (book) => {
  if(!book.title || typeof book.title !== "string"){
    return "Title is required and should be a string"
  }

  if(!book.author || typeof book.author !== "string"){
    return "author is required and should be a string"
  }

  return null
}
app.post("/api/books", (req, res) => {
  let error = validateBook(req.body)
  if(error) return res.status(400).send(error)
  let data = { id: books.length + 1, ...req.body }
  books.push(data)
  res.status(201).json(data)
})


// Exercise 3: Add a New Review/
let validateReview = (review) => {
  if(!review.content || typeof review.content !== "string"){
    return "content is required and should be a string"
  }
  if(!review.userId || typeof review.userId !== "number"){
    return "userId is required and should be a number"
  }
  return null
}
app.post("/api/reviews",(req, res) => {
  let error = validateReview(req.body)
  if(error) return res.status(400).send(error)
    let data = { id: reviews.length + 1, ...req.body }
  reviews.push(data)
  res.status(201).json(data)

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
