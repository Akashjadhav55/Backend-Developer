const express = require("express");
const app = express();
// const port = 3000;

app.use(express.json());

let employees = []
let Companies = []

// Exercise 1: Add a New Employee
let validateEmployee = (employee) => {
  if (!employee.name || typeof employee.name !== "string") {
    return "Name is required and should be a string";
  }
  if (!employee.companyId || typeof employee.companyId !== "number") {
    return "CompanyId is required and should be a number";
  }
  return null
};
app.post("/api/employees", (req, res) => {
  let error = validateEmployee(req.body);
  if (error) return res.status(400).send(error);
  let data = { id: employees.length + 1, ...req.body };
  employees.push(data);
  res.status(201).json(data);
});

// Exercise 2: Add a New Company 
let validateCompany = (company) => {
  if(!company.name || typeof company.name !== "string"){
    return "Name is required and should be a string"
  }
  return null
}
app.post("/api/companies", (req, res) => {
  let error = validateCompany(req.body)
  if(error) return res.status(400).send(error)
  let data = { id: Companies.length + 1, ...req.body }
  Companies.push(data)
  res.status(201).json(data)
})


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

module.exports = { app, validateEmployee, validateCompany }