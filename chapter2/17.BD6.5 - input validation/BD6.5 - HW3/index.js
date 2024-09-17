const express = require("express");
const app = express();
// const port = 3000;

app.use(express.json());

let articles = [
  {
    'id': 1,
    'title': 'Understanding JavaScript',
    'content': 'JavaScript is a versatile language used for both frontend and backend development.'
  },
  {
    'id': 2,
    'title': 'Introduction to React',
    'content': 'React is a popular JavaScript library for building user interfaces.'
  }
];
let authors = [
  {
    'id': 1,
    'name': 'John Doe',
    'articleId': 1
  },
  {
    'id': 2,
    'name': 'Jane Smith',
    'articleId': 2
  }
]

// Exercise 1: Add a New article
let validateArticle = (article) => {
  if (!article.title || typeof article.title !== "string") {
    return "Title is required and should be a string";
  }
  if (!article.content || typeof article.content !== "string") {
    return "Content is required and should be a string";
  }
  return null
};
app.post("/articles", (req, res) => {
  let error = validateArticle(req.body);
  if (error) return res.status(400).send(error);
  let data = { id: articles.length + 1, ...req.body };
  articles.push(data);
  res.status(201).json(data);
});

// Exercise 2: Add a New author 
let validateAuthor = (author) => {
  if(!author.name || typeof author.name !== "string"){
    return "Name is required and should be a string"
  }
  if(!author.articleId || typeof author.articleId !== "number"){
    return "ArticleId is required and should be a number"
  }
  return null
}
app.post("/authors", (req, res) => {
  let error = validateAuthor(req.body)
  if(error) return res.status(400).send(error)
  let data = { id: authors.length + 1, ...req.body }
  authors.push(data)
  res.status(201).json(data)
})


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = { app, validateArticle, validateAuthor }