let express = require("express");
let { sequelize } = require("./lib/index")
let { books } = require("./model/book.model.js")
const { users } = require("./model/user.model.js");
const { like } = require("./model/like.model.js");
const { Op } = require("@sequelize/core")
let app = express()

app.use(express.json())


let bookData = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    year: 1960,
    summary: 'A novel about the serious issues of rape and racial inequality.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    year: 1949,
    summary: 'A novel presenting a dystopian future under a totalitarian regime.',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    year: 1851,
    summary: 'The narrative of the sailor Ishmael and the obsessive quest of Ahab.',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    year: 1813,
    summary: 'A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    year: 1925,
    summary: 'A novel about the American dream and the roaring twenties.',
  },
]

app.get("/seed_db", async (req ,res) => {
  try {
    await sequelize.sync({ force : true })
    await users.create({
        username: 'booklover',
        email: 'booklover@gmail.com',
        password: 'password123',
    })
    await books.bulkCreate(bookData)
    res.status(200).json({ message: "Database Seeding Successfully " })
  } catch (err){
    res.status(500).json({ message: err.message })
  }
})




let userTrack = async () =>{
  let res = await like.findAll()
  return { result : res }
}
app.get("/user", async (req ,res) => {
  try{
    let response = await userTrack()
    res.status(200).json(response)
  }catch (err){
    return res.status(500).json({ message : err.message })
  }
})

// Exercise 1: Like a Book
// http://localhost:3000/users/1/like?bookId=2
let likeBook  = async (data) => {
  let res = await like.create({
    userId : data.userId,
    bookId : data.bookId,
    createdAt: false,
    updatedAt: false,
  })
  return { message : "Books Liked" , res }
}
app.get("/users/:id/like", async (req ,res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let result = await likeBook({userId,bookId});

    res.status(200).json(result)
  } catch (error) {
    res.status(200).json({ message : error.message })
  }
})

//Exercise 2: Dislike a Track
// http://localhost:3000/users/1/dislike?bookId=2
let dislikeBook  = async (data) => {
  let res = await like.destroy({ where: {
    userId: data.userId,
    bookId : data.bookId,
  } })
  console.log(res)
  if( res === 0) return {}
  return { message : "Books Disliked" , res }
}
app.get("/users/:id/dislike", async (req ,res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let response = await dislikeBook({userId,bookId});

    if(!response.message){
      res.status(404).json({ message : "This book is not your liked list"})
    }

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message : error.message })
  }
})

// Exercise 3: Get All Liked Books
// http://localhost:3000/users/1/liked
let getAllLikedBooks  = async (userId) => {
  let res = await like.findAll({ 
    where: { userId },
    attributes: [ "bookId" ]
    })

  let bookRecords = [];
  for(let i = 0; i < res.length; i++){
    bookRecords.push(res[i].bookId)
  }
  let likedBooks = await books.findAll({
    where: { id : { [Op.in] : bookRecords } }
  })
  return { likedBooks }
}
app.get("/users/:id/liked", async (req ,res) => {
  try {
    let userId = req.params.id
    let response = await getAllLikedBooks(userId)

    if(response.likedBooks.length === 0){
      return res.status(404).json({ message : "No liked books found"})
    }
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message : error.message })
  }
})


app.listen(3000,() => {
  console.log("server is running on https:localhost:3000")
})