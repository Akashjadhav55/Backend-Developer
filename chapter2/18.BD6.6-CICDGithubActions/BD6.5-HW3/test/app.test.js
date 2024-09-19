const { app } = require("../index")
const { getAllBooks, getBooksById } = require("../controllers/data")
const http = require("http")
const request = require("supertest")

jest.mock("../controllers/data", () => ({
    ...jest.requireActual("../controllers/data"),
    getAllBooks : jest.fn(),
    getBooksById : jest.fn()
}))

let server;

beforeAll( async () => {
    server = http.createServer(app)
    server.listen(3010)
})

afterAll( async () => {
    server.close()
} )

describe("Controller Function Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("should return all books", () => {
        const mockBooks = [
            {
                'bookId': 1,
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'genre': 'Fiction'
            },
            {
                'bookId': 2,
                'title': '1984',
                'author': 'George Orwell',
                'genre': 'Dystopian'
            },
            {
                'bookId': 3,
                'title': 'The Great Gatsby',
                'author': 'F. Scott Fitzgerald',
                'genre': 'Classic'
            }
        ]

          getAllBooks.mockReturnValue(mockBooks)
          const res = getAllBooks()
          expect(res).toEqual(mockBooks)
          expect(res.length).toEqual(3)
    })

})

describe("API Testing", () =>  {
    test("GET /books should get all books ", async () =>{
        const res = await request(server).get("/books")
        expect(res.status).toBe(200)
        expect(res.body).toEqual([
                {
                    bookId: 1,
                    title: 'To Kill a Mockingbird',
                    author: 'Harper Lee',
                    genre: 'Fiction'
                },
                {
                    bookId: 2,
                    title: '1984',
                    author: 'George Orwell',
                    genre: 'Dystopian'
                },
                {
                    bookId: 3,
                    title: 'The Great Gatsby',
                    author: 'F. Scott Fitzgerald',
                    genre: 'Classic'
                }
        ])
        expect(res.body.length).toBe(3)
    })

    test("GET /books/details/1 should get book from Id", async () => {
        const res = await request(server).get("/books/details/1")
        console.log(res.body)
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
                bookId: 1,
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                genre: 'Fiction'
        })
    })
})
