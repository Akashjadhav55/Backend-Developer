const { app } = require("../index")
const { getAllEmployees, getAllEmployeeById } = require("../controllers/data")

const http = require("http")
const request = require("supertest")

jest.mock("../controllers/data", () => ({
    ...jest.requireActual("../controllers/data"),
    getAllEmployees : jest.fn(),
    getAllEmployeeById : jest.fn()
}))

let server;

beforeAll( async ( ) => {
    server = http.createServer(app)
    server.listen(3010)
})
afterAll( async () => {
    server.close()
})


describe("Controller Function tests", () => {
    beforeEach( () => {
        jest.clearAllMocks()
    }) 

    it("should return all employees", () => {
        const mockedEmployees = [
            {
                employeeId: 1,
                name: "Rahul Sharma",
                email: "rahul.sharma@example.com",
                departmentId: 1,
                roleId: 1,
            },
            {
                employeeId: 2,
                name: "Priya Singh",
                email: "priya.singh@example.com",
                departmentId: 2,
                roleId: 2,
            },
            {
                employeeId: 3,
                name: "Ankit Verma",
                email: "ankit.verma@example.com",
                departmentId: 1,
                roleId: 3,
            },
        ];

        getAllEmployees.mockReturnValue(mockedEmployees);
        const result = getAllEmployees();

        expect(result).toEqual(mockedEmployees);
        expect(result.length).toBe(3);
    });

    it("should get employee by Id", () => {
        getAllEmployeeById.mockReturnValue(  {
            employeeId: 1,
            name: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            departmentId: 1,
            roleId: 1,
        })
        const result = getAllEmployeeById(1)
        expect(result).toEqual(  {
            employeeId: 1,
            name: "Rahul Sharma",
            email: "rahul.sharma@example.com",
            departmentId: 1,
            roleId: 1,
        })
    })
});

describe("API Endpoint tests", () => {
    it("GET /employees should get all employees", async () => {
        const res = await request(server).get("/employees");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            employees: [
                {
                    employeeId: 1,
                    name: "Rahul Sharma",
                    email: "rahul.sharma@example.com",
                    departmentId: 1,
                    roleId: 1,
                },
                {
                    employeeId: 2,
                    name: "Priya Singh",
                    email: "priya.singh@example.com",
                    departmentId: 2,
                    roleId: 2,
                },
                {
                    employeeId: 3,
                    name: "Ankit Verma",
                    email: "ankit.verma@example.com",
                    departmentId: 1,
                    roleId: 3,
                },
            ],
        });
        expect(res.body.employees.length).toBe(3);
    });

    it("GET /employees/details/:id should get an employee by ID", async () => {
        const res = await request(server).get("/employees/details/1");
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            employee: {
                employeeId: 1,
                name: "Rahul Sharma",
                email: "rahul.sharma@example.com",
                departmentId: 1,
                roleId: 1,
            },
        });
    });
});
