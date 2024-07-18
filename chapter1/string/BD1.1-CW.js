import express from 'express';
let app = express()

app.get("/shout", (req, res) => {
    let name = req.query.date
    console.log(name)
    res.send(name.toUpperCase())
})

let PORT = 3000
app.listen(PORT, () => {
    console.log("server is running on https://" + PORT)
})//
