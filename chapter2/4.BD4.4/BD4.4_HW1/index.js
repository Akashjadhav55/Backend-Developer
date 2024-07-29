 let express = require("express");
 let sqlite3 = require("sqlite3").verbose()
 let { open } = require("sqlite");


 let app = express()

 const PORT = process.env.PORT || 3000;
 let db;

 (async () => {
   db = await open({
     filename : "database.sqlite",
     driver : sqlite3.Database
   })
 })();


// Exercise 1: Fetch All Courses
// http://localhost:3000/courses

let fetchAllCourses = async () => {
   let query = "SELECT * FROM courses"
   let response = await db.all(query, [])
   return { courses : response }
 }
 app.get("/courses", async (req ,res) => {
   try{
     let result = await fetchAllCourses()
     if(result.courses.length === 0 ){
       return res.status(404).json({ message : "No courses found."})
     }
     return res.status(200).json(result)

   }catch(error){
     return res.status(500).json({ error : error.message })
   }
 })

// Exercise 2: Fetch Courses by Instructor
// http://localhost:3000/c

 let fetchCoursesByInstructor = async (instructor) => {
   let query = "SELECT id, title, instructor, category FROM courses WHERE instructor = ?"
   let response = await db.all(query, [instructor])
   return { courses : response }
 }
 app.get("/courses/instructor/:instructor", async (req ,res) => {
   try{
     let instructor = req.params.instructor
     let result = await fetchCoursesByInstructor(instructor)
     if(result.courses.length === 0 ){
       return res.status(404).json({ message : "No courses found."})
     }
     return res.status(200).json(result)

   }catch(error){
     return res.status(500).json({ error : error.message })
   }
 })


// Exercise 3: Fetch Courses by Category
// http://localhost:3000/courses/category/Database
 let fetchCoursesByCategory = async (category) => {
   let query = "SELECT id, title, category, release_year FROM courses WHERE category = ?"
   let response = await db.all(query, [category])
   return { courses : response }
 }
 app.get("/courses/category/:category", async (req ,res) => {
   try{
     let category = req.params.category
     let result = await fetchCoursesByCategory(category)
     if(result.courses.length === 0 ){
       return res.status(404).json({ message : "No courses found."})
     }
     return res.status(200).json(result)

   }catch(error){
     return res.status(500).json({ error : error.message })
   }
 })


// Exercise 4: Fetch Courses by Year
// http://localhost:3000/courses/year/2021

 let fetchCoursesByYear = async (year) => {
   let query = "SELECT id, title, release_year, category FROM courses WHERE release_year = ?"
   let response = await db.all(query, [year])
   return { courses : response }
 }
 app.get("/courses/year/:year", async (req ,res) => {
   try{
     let year = req.params.year
     let result = await fetchCoursesByYear(year)
     if(result.courses.length === 0 ){
       return res.status(404).json({ message : "No courses found."})
     }
     return res.status(200).json(result)

   }catch(error){
     return res.status(500).json({ error : error.message })
   }
 })


 app.listen(PORT, () => {
   console.log(`Server is running on https://localhost:${PORT}`);
 })
