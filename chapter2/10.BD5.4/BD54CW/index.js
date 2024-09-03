let express = require("express");
let { sequelize } = require("./lib/index")
let { track } = require("./model/track.model.js");
const { user } = require("./model/user.model.js");
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
    await track.bulkCreate(trackData)
    res.status(200).json({ message: "Database Seeding Successfully " })
  } catch (err){
    res.status(500).json({ message: err.message })
  }
})


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

app.listen(3000,() => {
  console.log("server is running on https:localhost:3000")
})