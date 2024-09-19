let { app } = require("../index")
let http = require("http")
let request = require("supertest")
let { getShows, getShowById } = require("../controllers/data")
 
jest.mock("../controllers/data",() => ({
    ...jest.requireActual("../controllers/data"),
    getShows : jest.fn(),
    getShowById : jest.fn()
}))

let server;

beforeAll( async () => {
    server = http.createServer(app)
    server.listen(3010)
})

afterAll( async () => {
    server.close()
})

de
