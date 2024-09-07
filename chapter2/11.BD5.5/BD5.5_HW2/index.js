let express = require("express");
const { sequelize } = require("./lib");
const { users } = require("./model/user.model");
const { movies } = require("./model/movie.model");
const { like } = require("./model/like.model");
const { Op } = require("@sequelize/core");

let app = express()


let movieData = [
  {
    title: 'Inception',
    director: 'Christopher Nolan',
    genre: 'Sci-Fi',
    year: 2010,
    summary: 'A skilled thief is given a chance at redemption if he can successfully perform an inception.',
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    genre: 'Crime',
    year: 1972,
    summary: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino',
    genre: 'Crime',
    year: 1994,
    summary: 'The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.',
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan',
    genre: 'Action',
    year: 2008,
    summary: 'When the menace known as the Joker emerges, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  },
  {
    title: 'Forrest Gump',
    director: 'Robert Zemeckis',
    genre: 'Drama',
    year: 1994,
    summary: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other events unfold from the perspective of an Alabama man with an IQ of 75.',
  },
]

app.get("/seed_db", async (req ,res) => {
  try {
    await sequelize.sync({ force : true })
    await users.create({
      username: 'moviefan',
      email: 'moviefan@gmail.com',
      password: 'password123',
    })
    await movies.bulkCreate(movieData)
    return res.status(200).json({ message : "Database succesfully seeding" })
  } catch (error) {
    return res.status(500).json({ message : error.message })
  }
})

app.get("/", (req ,res) => {
  res.send("Welcome Back Chief")
})

let liked = async () =>{
  let res = await like.findAll()
  return { result : res }
}
app.get("/like", async (req ,res) => {
  try{
    let response = await liked()
    res.status(200).json(response)
  }catch (err){
    return res.status(500).json({ message : err.message })
  }
})

//  Exercise 1: Like a Movie
//  http://localhost:3000/users/1/like?movieId=2
let likeMovie = async (userId, movieId) => {
  let res = await like.create({
    userId : userId,
    movieId : movieId,
  })

  return { message : "Liked Movie", res }
}
app.get("/users/:id/like", async (req ,res) => {
  try {
    let userId = req.params.id
    let movieId = req.query.movieId;
    let response = await likeMovie(userId,movieId)

    return res.status(200).json(response)
  } catch (error){
    return res.status(500).json({ message : error.message })
  }
})


// Exercise 2: Dislike a Movie
// http://localhost:3000/users/1/dislike?movieId=2
let dislikeMovie = async (userId, movieId) =>{
  let res = await like.destroy({ where : {
      userId : userId,
      movieId : movieId,
  }} )
  if(res === 0) return {}
  return { message : "Dislike Movie" }
}
app.get("/users/:id/dislike", async (req ,res) => {
  try {
    let userId = req.params.id
    let movieId = req.query.movieId;
    let response = await dislikeMovie(userId,movieId)

    if(!response.message){
      return res.status(404).json({ message : "This movie is not your liked list"})
    }
    return res.status(200).json(response)
  } catch (error){
    return res.status(500).json({ message : error.message })
  }
})




// Exercise 3: Get All Liked Movies
// http://localhost:3000/users/1/liked
let getAllLikedMovies  = async (userId) => {
  let res = await like.findAll({ 
    where : { userId },
    attributes :[ "movieId" ]
  })
  let movieIds = [];
  for(let i = 0; i < res.length; i++){
    movieIds.push(res[i].movieId)
  }
  console.log(movieIds)
  let likedMovies = await movies.findAll({ 
    where : { id: { [ Op.in ] : movieIds } } 
  })

  return { likedMovies }
}
app.get("/users/:id/liked", async (req ,res) => {
  try {
    let userId = req.params.id
    let response = await getAllLikedMovies (userId)

    if(!response.likedMovies.length === 0){
      return res.status(404).json({ message : "Not liked movie found"})
    }
    return res.status(200).json(response)
  } catch (error){
    return res.status(500).json({ message : error.message })
  }
})





app.listen(3000,() => {
  console.log("server is running on https://localhost:3000")
})