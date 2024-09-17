let { app, validateArticle, validateAuthor } = require("../index.js")
let request = require("supertest")
let http = require("http");

let server;

beforeAll((done) => {
    server = http.createServer(app)
    server.listen(3010, done)
})

afterAll((done) => {
    server.close(done)
})

describe("Api Tesing", () => {
    test("Api GET should add new article", async () =>{
        let res = await request(server).post("/articles").send({ title: 'Mastering Node.js', content: 'Node.js is a powerful tool for backend development...' })
          expect(res.statusCode).toEqual(201)
          expect(res.body).toEqual({  id: 3, title: 'Mastering Node.js', content: 'Node.js is a powerful tool for backend development...'})
    })
    test("should add new article return 400 error with invalid input", async () => {
        let res = await request(server).post("/articles").send({ title: 'Mastering Node.js' })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("Content is required and should be a string")
    })


    test("should Test Add a New author with Valid Input", async () =>{
        let res = await request(server).post("/authors").send({  name: 'Alice Johnson',articleId: 3 })
          expect(res.statusCode).toEqual(201)
          expect(res.body).toEqual({id: 3, name: 'Alice Johnson', articleId: 3})
    })
    test("should add new author return 400 error with invalid input", async () => {
        let res = await request(server).post("/authors").send({ name: 'Alice Johnson' })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("ArticleId is required and should be a number")
    })
})

describe("validation function mock", () => {
    test("should validate new Article",  () => {
        expect(validateArticle({ title: 'Mastering Node.js', content: 'Node.js is a powerful tool for backend development...'})).toBeNull()
    })
    test("should validate Article function error", () => {
        expect(validateArticle( { title: 'Mastering Node.js'} )).toEqual( "Content is required and should be a string" )
        expect(validateArticle( { content: 'Node.js is a powerful tool for backend development...'} )).toEqual( "Title is required and should be a string" )
    })

    test("should validate new Author ", () =>{
        expect(validateAuthor({ name: 'Alice Johnson',articleId: 3  })).toBeNull()
    })
    test("should validate Author function error", () => {
        expect(validateAuthor( {  name: 'Alice Johnson' } )).toEqual( "ArticleId is required and should be a number" )
        expect(validateAuthor( { articleId: 3 } )).toEqual( "Name is required and should be a string" )

    })
})



