let express = require("express")
let cors = require("cors")
const { getShows, getShowById, addNewShow } = require("./controllers/data")
const app = express()


app.use(express.json())
app.use(cors())

app.get("/shows", async (req, res) => {
    let response =  await getShows()
    return res.json(response)
})

app.get("/shows/:id", async (req, res) => {
    let response = await getShowById(parseInt(req.params.id))
    return  res.json(response)
})

app.post("/shows",async (req, res) => {
    let response = await addNewShow(req.body)
    return res.json(response)
})


module.exports = { app }








module.exports = { app };
