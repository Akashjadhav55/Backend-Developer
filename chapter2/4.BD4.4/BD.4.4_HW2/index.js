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


// Exercise 1: Fetch All Artworks
// http://localhost:3000/artworks

let fetchAllArtworks = async () => {
   let query = "SELECT id, title, artist FROM artworks"
   let response = await db.all(query, [])
   return { artworks : response }
 }
 app.get("/artworks", async (req ,res) => {
   try{
     let result = await fetchAllArtworks()
     if(result.artworks.length === 0 ){
       return res.status(404).json({ message : "No artworks found."})
     }
     return res.status(200).json(result)

   }catch(error){
     return res.status(500).json({ error : error.message })
   }
 })

//Exercise 2: Fetch Artworks by Artist
// http://localhost:3000/artworks/artist/Vincent%20Van%20Gogh
 let fetchArtworksByArtist = async (artist) => {
   let query = "SELECT id, title, artist, year FROM artworks WHERE artist = ?"
   let response = await db.all(query, [artist])
   return { artworks : response }
 }
 app.get("/artworks/artist/:artist", async (req ,res) => {
   try{
     let artist = req.params.artist
     let result = await fetchArtworksByArtist(artist)
     if(result.artworks.length === 0 ){
       return res.status(404).json({ message : "No artworks found."})
     }
     return res.status(200).json(result)

   }catch(error){
     return res.status(500).json({ error : error.message })
   }
 })


// Exercise 3: Fetch Artworks by Year
// http://localhost:3000/artworks/year/1889 
 let fetchArtworksByYear = async (year) => {
   let query = "SELECT id, title, artist, year FROM artworks WHERE year = ?"
   let response = await db.all(query, [year])
   return { artworks : response }
 }
 app.get("/artworks/year/:year", async (req ,res) => {
   try{
     let year = parseInt(req.params.year)
     let result = await fetchArtworksByYear(year)
     if(result.artworks.length === 0 ){
       return res.status(404).json({ message : "No artworks found."})
     }
     return res.status(200).json(result)

   }catch(error){
     return res.status(500).json({ error : error.message })
   }
 })

// Exercise 4: Fetch Artworks by Medium
//  http://localhost:3000/artworks/medium/Oil%20Painting
 let fetchArtworksByMedium = async (medium) => {
   let query = "SELECT id, title, artist, medium FROM artworks WHERE medium = ?"
   let response = await db.all(query, [medium])
   return { artworks : response }
 }
 app.get("/artworks/medium/:medium", async (req ,res) => {
   try{
     let medium = req.params.medium
     let result = await fetchArtworksByMedium(medium)
     if(result.artworks.length === 0 ){
       return res.status(404).json({ message : "No artworks found."})
     }
     return res.status(200).json(result)

   }catch(error){
     return res.status(500).json({ error : error.message })
   }
 })

 app.listen(PORT, () => {
   console.log(`Server is running on https://localhost:${PORT}`);
 })
