const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

let validateUser = (user) => {
  if (!user.name || typeof user.name !== "string") {
    return "Name is required and should be a string";
  }
  if (!user.email || typeof user.email !== "string") {
    return "Email is required and should be a string";
  }
};
app.post("/api/users", (req, res) => {
  console.log(req.body);
  let error = validateUser(req.body);
  if (error) return res.status(400).send(error);
  let data = { id: users.length + 1, ...req.body };
  users.push(data);
  res.status(201).json(data);
});

// let validateUser = (user) => {
//   if(!user.name || typeof user.name !== "string"){
//     return "Name is required and should be a string"
//   }

//   if(!user.email || typeof user.email !== "string"){
//     return "Email is required and should be a string"
//   }
// }
// app.post("/api/users", (req, res) => {
//   let error = validateUser(req.body)
//   if(error) return res.status(400).send(error)
//   let data = { id: users.length + 1, ...req.body }
//   users.push(data)
//   res.status(201).json(data)
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
