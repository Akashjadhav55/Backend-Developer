let express = require("express");
let sqlite3 = require("sqlite3").verbose()
let { open } = require("sqlite")

let app = express()
let PORT = process.env.PORT  || 3000;
let db;

(async () => {
  db = await open({
    filename : "database.sqlite",
    driver : sqlite3.Database
  })
})()

app.get("/",(req , res) => {
  return res.json({ message : "Backend Devloper 3.5 HW2" })
})


// Exercise 1: Fetch Employees by Minimum Salary
// http://localhost:3000/employees/salary?minSalary=80000
let filterEmployeesBySalary = async (salary) => {
  let query = "SELECT * FROM employees Where salary > ?"
  let response = await db.all(query, [salary])
  return { employees : response }
}
app.get("/employees/salary", async (req ,res) => {
  try{
  let minSalary = req.query.minSalary
  let result = await filterEmployeesBySalary(minSalary)
    if(result.employees.length === 0){
      return res.status(404).json({ message : "Employees Data Not Found" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({error: error.message})
  }
})


// Exercise 2: Fetch Employees by Department and Minimum Experience
// http://localhost:3000/employees/department-experience?department=Engineering&minExperience=5
let filterEmployeesByDepartmentAndExperience = async (department, minExperience) => {
  let query = "SELECT * FROM employees Where department = ? AND years_of_experience > ?"
  let response = await db.all(query, [department, minExperience])
  return { employees : response }
}
app.get("/employees/department-experience", async (req ,res) => {
  console.log("call")
  try{
  let department = req.query.department
  let minExperience = parseInt(req.query.minExperience)
  let result = await filterEmployeesByDepartmentAndExperience(department,minExperience)
    if(result.employees.length === 0){
      return res.status(404).json({ message : "Employees Data Not Found" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({error: error.message})
  }
})

// Exercise 3: Fetch Employees Ordered by Salary
// http://localhost:3000/employees/ordered-by-salary
let fetchEmployeesOrderedBySalary = async () => {
  let query = "SELECT * FROM employees ORDER BY salary DESC"
  let response = await db.all(query, [ ])
  return { employees : response }
}

app.get("/employees/ordered-by-salary", async (req ,res) => {
  try{
  let result = await fetchEmployeesOrderedBySalary()
    if(result.employees.length === 0){
      return res.status(404).json({ message : "Employees Data Not Found" })
    }
  return res.status(200).json(result)
  }catch(error){
    return res.status(500).json({error: error.message})
  }
})


app.listen(PORT, () => {
  console.log("server is running on https://localhost:"+PORT)
})