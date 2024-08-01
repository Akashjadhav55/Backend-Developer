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


// Exercise 1: Fetch Courses by Minimum Rating
// http://localhost:3000/courses/rating?minRating=4

let filterCoursesByRating = async (rating) => {
   let query = "SELECT * FROM courses WHERE rating > ?"
   let response = await db.all(query, [rating])
   return { courses : response }
 }
 app.get("/courses/rating", async (req ,res) => {
    let minRating = parseFloat(req.query.minRating)
   try{
     let result = await filterCoursesByRating(minRating)
     if(result.courses.length === 0){
       return res.status(404).json({ message : "Sorry, no courses were found. Check your spelling or try searching for something else." })
     }
     return res.status(200).json(result)
   }
  catch(error){
     return res.status(500).json({ error: error.message })
  }
 })






// Exercise 2: Fetch Courses by Instructor and Minimum Duration
// http://localhost:3000/courses/instructor-duration?instructor=Instructor%20A&minDuration=7
let filterCoursesByInstructorAndDuration = async (minDuration,instructor) => {
  console.log(typeof minDuration, minDuration)
   let query = "SELECT * FROM courses WHERE instructor = ? AND duration > ? "
   let response = await db.all(query, [minDuration, instructor ])
   return { courses : response }
 }
 app.get("/courses/instructor-duration", async (req ,res) => {
   let instructor = req.query.instructor;
   let minDuration = parseInt(req.query.minDuration);  
   try{
     let result = await filterCoursesByInstructorAndDuration(minDuration,instructor)
     if(result.courses.length === 0){
       return res.status(404).json({ message : "Sorry, no courses were found." })
     }
     return res.status(200).json(result)
   }
  catch(error){
     return res.status(500).json({ error: error.message })
  }
 })



 app.listen(PORT, () => {
   console.log(`Server is running on https://localhost:${PORT}`);
 })
