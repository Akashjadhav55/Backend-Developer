let { app } = require("../index.js")
let http = require("http")
let request = require("supertest")
let { getShows, getShowById, addNewShow } = require("../controllers/data")
 
jest.mock("../controllers/data",() => ({
    ...jest.requireActual("../controllers/data"),
    getShows : jest.fn(),
    getShowById : jest.fn(),
    addNewShow : jest.fn()
}))

let server;

beforeAll( async () => {
    server = http.createServer(app)
    server.listen(3010)
})

afterAll( async () => {
    server.close()
})



describe("function testing" , () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("should add new show", () => {
        const mockShow = {
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
          }
          addNewShow.mockReturnValue({
            showId: 5,
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
          })
          const response = addNewShow(mockShow)
          expect(response).toEqual({
            showId: 5,
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
          })
    }) 

    test('should mock addShow function', async () => {
        const addShow = {showId: 5, title: 'Phantom of the Opera', theatreId: 2, time: '5:00 PM' }
        const newShow = { title: 'Phantom of the Opera', theatreId: 2, time: '5:00 PM' };
        
        addNewShow.mockReturnValue(addShow)
        const response = addNewShow(newShow)
        console.log(response)
        expect(response).toEqual(  {
            showId: 5,
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
          });
      });


})


describe("API Testing", () => {
   
    test('should  return all shows', async () => {
        const mockShows = [
            { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' },
            { showId: 2, title: 'Hamilton', theatreId: 2, time: '8:00 PM' },
            { showId: 3, title: 'Wicked', theatreId: 3, time: '9:00 PM' },
            { showId: 4, title: 'Les Misérables', theatreId: 1, time: '6:00 PM' },
          ];

        getShows.mockReturnValue(mockShows)
        const res = await request(server).get('/shows')

        expect(res.status).toBe(200)
        expect(res.body.shows).toEqual(mockShows)

    })

    test('should get show by ID', async () => {
        getShowById.mockReturnValue({ showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' })
        const response = await request(app).get('/shows/1');
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('The Lion King');
    });

    test('should add a new show', async () => {
        const newShow = { title: 'Phantom of the Opera', theatreId: 2, time: '5:00 PM' };
        const response = await request(app).post('/shows').send(newShow);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            'showId': 5,
            'title': 'Phantom of the Opera',
            'theatreId': 2,
            'time': '5:00 PM'
          });
      });

      test('should return error 404 for get show by invalid ID', async () => {
        getShowById.mockReturnValue(null)
        const response = await request(app).get('/shows/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toEqual("Not Show Found");
    });

    test("should return 400  for invalid show data", async () => {
        const newShow =  { theatreId: 2, time: '5:00 PM' };
        const res = await  request(server).post('/shows').send(newShow);
        expect(res.status).toBe(400);
        expect(res.text).toEqual("Show is required and should be a string")
    })

})