let request = require("supertest")
let { app, validateBook, validateReview, validateUser } = require("../index.js")
const http = require("http");

let server;

beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3010, done)
});

afterAll((done) => {
    server.close(done)
})

describe("API Endpoints Testing", () => {
    test("should add a new user with valid input", async () => {
        const res = await request(server)
            .post("/api/users")
            .send({ name: 'Alice',email: 'alice@example.com'})
          expect(res.statusCode).toEqual(201)
          expect(res.body).toEqual({id : 1,name: 'Alice',email: 'alice@example.com'})
    })
    test("should return 400 from invalid user input", async () =>{
        const res = await request(server).post("/api/users").send({ name: "Alice" })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("Email is required and should be a string")
    })

    test("should add new book with valid input", async () => {
        const res = await request(server).post("/api/books").send( {title: 'Moby Dick',author: 'Herman Melville'} )
        expect(res.statusCode).toEqual(201)
        expect(res.body).toEqual( {id: 1, title: 'Moby Dick', author: 'Herman Melville'} )
    })
    test("should return 400 from invalid user input", async () => {
        const res = await request(server).post("/api/books").send({ title: "Moby Dick" })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("author is required and should be a string")
    })

    test("should add new review with valid input", async () => {
        const res = await request(server).post("/api/reviews").send({
            content: 'Great book!',
            userId: 1
          })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toEqual( {
            id: 1,
            content: 'Great book!',
            userId: 1
          } )
    })
    test("should return 400 from invalid review input", async () => {
        const res = await request(server).post("/api/reviews").send({ content: 'Great book!'})
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("userId is required and should be a number")
    })
})

describe("Validation Functions", () => {
    test("should validate user input correctly", () =>{
        expect(validateUser({ name: 'Alice', email: 'alice@example.com' })).toBeNull()
        expect(validateUser({name: 'Alice'})).toEqual("Email is required and should be a string")
        expect(validateUser({ email: 'alice@example.com' })).toEqual("Name is required and should be a string")
    })

    test("should validate book input correctly", () => {
        expect(validateBook({title: 'Moby Dick',author: 'Herman Melville'})).toBeNull()
        expect(validateBook({ title : 'Moby Dick' })).toEqual("author is required and should be a string")
        expect(validateBook({ author :'Herman Melville' })).toEqual("Title is required and should be a string")
    })

    
    test("should validate review input correctly", () => {
        expect(validateReview({ content: 'Great book!', userId: 1 })).toBeNull()
        expect(validateReview({  content: 'Great book!' })).toEqual("userId is required and should be a number")
        expect(validateReview({ userId: 1 })).toEqual("content is required and should be a string")
    })
})




