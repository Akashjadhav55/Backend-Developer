const express = require("express");
const cors = require("cors");
const { getAllEmployeeById, getAllEmployees } = require("./controllers/data");


const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());


app.get("/employees", async (req, res) => {
  const employees = await getAllEmployees()
  res.json({employees})
})

app.get("/employees/details/:id", async (req, res) => {
  let employee = await getAllEmployeeById(parseInt(req.params.id))
  res.json({ employee })
})

module.exports = { app };

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
