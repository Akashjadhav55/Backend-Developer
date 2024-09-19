const { app } = require("../index")
const { getAllMovies, getMoviesById } = require("../controllers/data")
const http = require("http")
const request = require("supertest")

jest.mock("../controllers/data", () => ({
    ...jest.requireActual("../controllers/data"),
    getAllMovies : jest.fn(),
    getMoviesById : jest.fn()
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

    test("should return all movies", () => {
        const mockMovies = [
            {
              'movieId': 1,
              'title': 'Inception',
              'genre': 'Sci-Fi',
              'director': 'Christopher Nolan'
            },
            {
              'movieId': 2,
              'title': 'The Shawshank Redemption',
              'genre': 'Drama',
              'director': 'Frank Darabont'
            },
            {
              'movieId': 3,
              'title': 'The Godfather',
              'genre': 'Crime',
              'director': 'Francis Ford Coppola'
            }
          ]

          getAllMovies.mockReturnValue(mockMovies)
          const res = getAllMovies()
          expect(res).toEqual(mockMovies)
          expect(res.length).toEqual(3)
    })

    test("should get moive by Id", () => {
        getMoviesById.mockReturnValue({
            'movieId': 1,
            'title': 'Inception',
            'genre': 'Sci-Fi',
            'director': 'Christopher Nolan'
          })
          const res = getMoviesById(1)
          expect(res).toEqual({
            'movieId': 1,
            'title': 'Inception',
            'genre': 'Sci-Fi',
            'director': 'Christopher Nolan'
          })
    })
})

describe("API Testing", () =>  {
    test("GET /movies should get all movies ", async () =>{
        const res = await request(server).get("/movies")
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            response: [
                {
                    "movieId": 1,
                    "title": "Inception",
                    "genre": "Sci-Fi",
                    "director": "Christopher Nolan"
                },
                {
                    "movieId": 2,
                    "title": "The Shawshank Redemption",
                    "genre": "Drama",
                    "director": "Frank Darabont"
                },
                {
                    "movieId": 3,
                    "title": "The Godfather",
                    "genre": "Crime",
                    "director": "Francis Ford Coppola"
                }
            ]
        })
        expect(res.body.response.length).toBe(3)
    })

    test("GET /movies/details/:id should get movie from Id", async () => {
        let res = await request(server).get("/movies/details/1")
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            response: {
            "movieId": 1,
            "title": "Inception",
            "genre": "Sci-Fi",
            "director": "Christopher Nolan"
            }
        })
    })
})
