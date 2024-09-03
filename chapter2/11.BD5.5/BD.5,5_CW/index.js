let express = require("express");
let { sequelize } = require("./lib/index")
let { track } = require("./model/track.model.js");
const { user } = require("./model/user.model.js");
const { like } = require("./model/like.model.js");
const { Op } = require("@sequelize/core")
const { where } = require("sequelize");
let app = express()

app.use(express.json())


let trackData = [
    {
      name: 'Raabta',
      genre: 'Romantic',
      release_year: 2012,
      artist: 'Arijit Singh',
      album: 'Agent Vinod',
      duration: 4,
    },
    {
      name: 'Naina Da Kya Kasoor',
      genre: 'Pop',
      release_year: 2018,
      artist: 'Amit Trivedi',
      album: 'Andhadhun',
      duration: 3,
    },
    {
      name: 'Ghoomar',
      genre: 'Traditional',
      release_year: 2018,
      artist: 'Shreya Ghoshal',
      album: 'Padmaavat',
      duration: 3,
    },
    {
      name: 'Bekhayali',
      genre: 'Rock',
      release_year: 2019,
      artist: 'Sachet Tandon',
      album: 'Kabir Singh',
      duration: 6,
    },
    {
      name: 'Hawa Banke',
      genre: 'Romantic',
      release_year: 2019,
      artist: 'Darshan Raval',
      album: 'Hawa Banke (Single)',
      duration: 3,
    },
    {
      name: 'Ghungroo',
      genre: 'Dance',
      release_year: 2019,
      artist: 'Arijit Singh',
      album: 'War',
      duration: 5,
    },
    {
      name: 'Makhna',
      genre: 'Hip-Hop',
      release_year: 2019,
      artist: 'Tanishk Bagchi',
      album: 'Drive',
      duration: 3,
    },
    {
      name: 'Tera Ban Jaunga',
      genre: 'Romantic',
      release_year: 2019,
      artist: 'Tulsi Kumar',
      album: 'Kabir Singh',
      duration: 3,
    },
    {
      name: 'First Class',
      genre: 'Dance',
      release_year: 2019,
      artist: 'Arijit Singh',
      album: 'Kalank',
      duration: 4,
    },
    {
      name: 'Kalank Title Track',
      genre: 'Romantic',
      release_year: 2019,
      artist: 'Arijit Singh',
      album: 'Kalank',
      duration: 5,
    },
  ]

app.get("/seed_db", async (req ,res) => {
  try {
    await sequelize.sync({ force : true })
    await user.create({
      username : "testuser",
      email : "testuser@gmail.com",
      password: "testuser",
    })
    await track.bulkCreate(trackData)
    res.status(200).json({ message: "Database Seeding Successfully " })
  } catch (err){
    res.status(500).json({ message: err.message })
  }
})

// 1
let addNewUser = async (newUser) =>{
  let newData = await user.create(newUser);
  return { newData };
}
app.post("/users/new", async (req ,res) => {
 try{
  let newUser = req.body.newUser;
   let response = await addNewUser(newUser)
   return res.status(200).json(response);
 } catch (error){
   return res.status(500).json({ error: error.message })
 }
})

// 2
let updateUserById = async (newUserData, id) => {
  let userDetails = await user.findOne({ where: {id} })
  if (!userDetails) {
    return {}
  }
  userDetails.set(newUserData)
  let updatedUser = await userDetails.save();
  return { message: "User Successfully Updated" , updatedUser}
}
app.post("/user/update/:id", async (req ,res) => {
  try {
    let newUserData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateUserById(newUserData, id)
    res.status(200).json(response)

  } catch (error) {
    res.status(500).json({ error: error.message })
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

// Exercise 1: Like a Track
// http://localhost:3000/users/1/like?trackId=2
let likeTrack = async (data) => {
  let res = await like.create({
    userId : data.userId,
    trackId : data.trackId,
  })
  return { message : "Track Liked" , res }
}
app.get("/users/:id/like", async (req ,res) => {
  try {
    let userId = req.params.id;
    let trackId = req.query.trackId;
    let result = await likeTrack({userId,trackId});

    res.status(200).json(result)
  } catch (error) {
    res.status(200).json({ message : error.message })
  }
})

//Exercise 2: Dislike a Track
// http://localhost:3000/users/1/dislike?trackId=23
let dislikeTrack = async (data) => {
  let res = await like.destroy({ where: {
    userId: data.userId,
    trackId : data.trackId,
  } })
  if( res === 0) return {}
  return { message : "Track Disliked" , res }
}
app.get("/users/:id/dislike", async (req ,res) => {
  try {
    let userId = req.params.id;
    let trackId = req.query.trackId;
    let response = await dislikeTrack({userId,trackId});

    if(!response.message){
      res.status(404).json({ message : "This track is not your liked list"})
    }

    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message : error.message })
  }
})

// Exercise 3: Get All Liked Tracks
// http://localhost:3000/users/1/liked
let getAllLikedTracks = async (userId) => {
  let res = await like.findAll({ 
    where: { userId },
    attributes: [ "trackId" ]
    })

  let trackRecords = [];
  for(let i = 0; i < res.length; i++){
    trackRecords.push(res[i].trackId)
  }
  console.log(trackRecords)
  let likedTracks = await track.findAll({
    where: { id : { [Op.in] : trackRecords } }
  })
  return { likedTracks }
}
app.get("/users/:id/liked", async (req ,res) => {
  try {
    let userId = req.params.id
    let response = await getAllLikedTracks(userId)

    if(response.likedTracks.length === 0){
      return res.status(404).json({ message : "No liked tracks found"})
    }
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json({ message : error.message })
  }
})

// Exercise 4: Get All Liked Tracks by Artist
// http://localhost:3000/users/1/liked-artist?artist=Arijit%20Singh
let getAllLikedTracksByArtists = async (userId, artist) => {
  let trackIds = await like.findAll({ 
    where: { userId },
    attributes: [ "trackId" ]
    });
  let trackRecords = [];
  for(let i = 0; i < trackIds.length; i++){
    trackRecords.push(trackIds[i].trackId)
  }

  let likeTracks = await track.findAll({
    where: { id: {[Op.in] : trackRecords }, artist}
  })
  return { likeTracks }
}
app.get("/users/:id/liked-artist", async (req ,res) => {
  try{
    let userId = req.params.id;
    let artist = req.query.artist;
    console.log(userId,artist)

    let response = await getAllLikedTracksByArtists(userId, artist)
    if(response.likeTracks.length === 0){
      return res.status(404).json({ message : "No liked tracks found by" + artist})
    }
    return res.status(200).json(response)
  }catch (err){
    return res.status(500).json({ message : err.message })

  }
})

app.listen(3000,() => {
  console.log("server is running on https:localhost:3000")
})