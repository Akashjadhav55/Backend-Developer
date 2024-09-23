let express = require("express")
let cors = require("cors")
const { getShows, getShowById, addNewShow } = require("./controllers/data")
const app = express()


app.use(express.json())
app.use(cors())

app.get("/shows", async (req, res) => {
    let shows =  await getShows()
    if (shows.length === 0) {
        return res.status(404).json("Show Not Found")
    } 
    return res.status(200).json({shows})
})

app.get("/shows/:id", async (req, res) => {
    let response = await getShowById(parseInt(req.params.id))
    if (!response) {
        return res.status(404).json( { error : "Not Show Found"})
    } 
    return  res.status(200).json(response)
})

let validateShow = (show) => {
    if(!show.title || typeof show.title !== 'string'){
        return 'Show is required and should be a string'
    }
    if(!show.theatreId ||  typeof show.theatreId !== 'number'){
        return  'Theatre ID is required and should be a number'
    }
    if(!show.time  || typeof show.time !== 'string'){
        return 'Time is required and should be a string'
    }

    return null
}
app.post("/shows",async (req, res) => {
    let error = validateShow(req.body)
    if(error) return res.status(400).send(error)
    let response = await addNewShow(req.body)
    return res.status(201).json(response)
})


module.exports = { app }

