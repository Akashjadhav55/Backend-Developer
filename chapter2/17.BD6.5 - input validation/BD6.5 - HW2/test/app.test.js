let { app, validateEmployee, validateCompany } = require("../index.js")
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

describe("API Tesing", () => {
    test("API GET  should add new employee", async () =>{
        let res = await request(server).post("/api/employees").send({
            name: 'John Doe',
            companyId: 1
          })
          expect(res.statusCode).toEqual(201)
          expect(res.body).toEqual({
            id: 1,
            name: 'John Doe',
            companyId: 1
          })
    })
    test("should add new employee return 400 error with invalid input", async () => {
        let res = await request(server).post("/api/employees").send({  name: 'John Doe' })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("CompanyId is required and should be a number")
    })

    test("should Test Add a New company with Valid Input", async () =>{
        let res = await request(server).post("/api/companies").send({ name: 'TechCorp' })
          expect(res.statusCode).toEqual(201)
          expect(res.body).toEqual({id: 1, name: 'TechCorp'})
    })
    test("should add new company return 400 error with invalid input", async () => {
        let res = await request(server).post("/api/companies").send({ name: 2 })
        expect(res.statusCode).toEqual(400)
        expect(res.text).toEqual("Name is required and should be a string")
    })

})

describe("validation function mock", () => {
    test("should validate new employee",  () => {
        expect(validateEmployee({  name: 'John Doe', companyId: 1})).toBeNull()
    })
    test("should validate employee function error", () => {
        expect(validateEmployee( { name: 'John Doe'} )).toEqual( "CompanyId is required and should be a number" )
        expect(validateEmployee( { companyId: 1 } )).toEqual( "Name is required and should be a string" )
    })

    test("should validate new company ", () =>{
        expect(validateCompany({ name: 'TechCorp'  })).toBeNull()
    })
    test("should validate company function error", () => {
        expect(validateCompany( { name: 2 } )).toEqual( "Name is required and should be a string" )
    })
})
