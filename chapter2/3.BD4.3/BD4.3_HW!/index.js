let express = require("express");
let sqlite3 = require("sqlite3").verbose()
let { open } = require("sqlite")

let app = express()
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename : "database.sqlite",
    driver : sqlite3.Database,
  });
})();

// Exercise 1: Fetch All Employees by Gender
// <http://localhost:3000/employees/gender/female

let filterByGender = async (gender) => {
  let query = "SELECT * FROM employees WHERE gender = ?"
  let response = await db.all(query, [gender])
  return { employees : response }
}

app.get("/employees/gender/:gender", async (req, res) => {
  try{
    let gender = req.params.gender;
    let result = await filterByGender(gender)
    if(result.employees.length === 0){
      return res.status(404).json({ mesaage : "Data Not Found"})
    }
    res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


// Exercise 2: Fetch All Employees by Department
// <http://localhost:3000/employees/department/Engineering

let filterByDepartment = async (department) => {
  let query = "SELECT * FROM employees WHERE department = ?"
  let response = await db.all(query, [department])
  return { employees : response }
}

app.get("/employees/department/:department", async (req, res) => {
  try{
    let department = req.params.department;
    let result = await filterByDepartment(department)
    if(result.employees.length === 0){
      return res.status(404).json({ mesaage : "Data Not Found"})
    }
    res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})

// Exercise 3: Fetch All Employees by Job Title
// <http://localhost:3000/employees/job_title/Software%20Engineer
let filterByJobTitle = async (job_title) => {
  let query = "SELECT * FROM employees WHERE job_title = ?"
  let response = await db.all(query, [job_title])
  return { employees : response }
}

app.get("/employees/job_title/:job_title", async (req, res) => {
  try{
    let job_title = req.params.job_title;
    let result = await filterByJobTitle(job_title)
    if(result.employees.length === 0){
      return res.status(404).json({ mesaage : "Data Not Found"})
    }
    res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})


//Exercise 4: Fetch All Employees by Location
// <http://localhost:3000/employees/location/New%20York
let filterByLocation = async (location) => {
  let query = "SELECT * FROM employees WHERE location = ?"
  let response = await db.all(query, [location])
  return { employees : response }
}

app.get("/employees/location/:location", async (req, res) => {
  try{
    let location = req.params.location;
    let result = await filterByLocation(location)
    if(result.employees.length === 0){
      return res.status(404).json({ mesaage : "Data Not Found"})
    }
    res.status(200).json(result)
  }catch(error){
    return res.status(500).json({ error: error.message })
  }
})
app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
})
