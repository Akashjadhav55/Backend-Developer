let { app, validateGame, validateTournament } = require("../index.js")
let request = require("supertest")
let http = require("http");
const exp = require("constants");

let server;

beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3010, done)
})

afterAll((done) => {
    server.close(done)
})

describe("API Tesing", () => {
    test("API GET api/games should add new game", async () =>{
        let res = await request(server).post("/api/games").send({
            title: 'The Legend of Zelda',
            genre: 'Adventure'
          })
          expect(res.statusCode).toEqual(201)
          expect(res.body).toEqual({ id: 1, title : 'The Legend of Zelda', genre : 'Adventure'})
    })
    test("should add new game return 400 error with invalid input", async () => {
        let res = await request(server).post("/api/games").send({ title : "Legend of Zelda" })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("Genre is required and should be a string")
    })
    test("should add new game return 400 error with invalid input", async () => {
        let res = await request(server).post("/api/games").send({genre: 'Adventure'})
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("Title is required and should be a string")
    })

    test("should Test Add a New Tournament with Valid Input", async () =>{
        let res = await request(server).post("/api/tournaments").send({ name : 'Zelda Championship', gameId: 1 })
          expect(res.statusCode).toEqual(201)
          expect(res.body).toEqual({id: 1, name: 'Zelda Championship', gameId: 1 })
    })
    test("should add new tournament return 400 error with invalid input", async () => {
        let res = await request(server).post("/api/tournaments").send({ name: 'Zelda Championship' })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("GameId is required and should be a number")
    })
    test("should add new tournament return 400 error with invalid input", async () => {
        let res = await request(server).post("/api/tournaments").send({ gameId: 1})
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("Name is required and should be a string")
    })
})

describe("validation function mock", () => {
    test("should validate new game",  () => {
        expect(validateGame({title: 'The Legend of Zelda', genre: 'Adventure'})).toBeNull()
    })
    test("should validate game function error", () => {
        expect(validateGame( { title : "Legend of Zelda" } )).toEqual( "Genre is required and should be a string" )
        expect(validateGame( {genre: 'Adventure'} )).toEqual( "Title is required and should be a string" )
    })

    test("should validate new tournament ", () =>{
        expect(validateTournament({ name: 'Zelda Championship', gameId: 1 })).toBeNull()
    })
    test("should validate game function error", () => {
        expect(validateTournament( { name: 'Zelda Championship'} )).toEqual( "GameId is required and should be a number" )
        expect(validateTournament( { gameId: 1 } )).toEqual( "Name is required and should be a string" )
    })
})
