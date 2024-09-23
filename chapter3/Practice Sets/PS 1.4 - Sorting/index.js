//  Exercise 1
let numbers = [2,5,10,6,4];
numbers.sort(( a,b ) => a-b)
console.log(numbers)

// Exercise 2
const ages = [32, 21, 45, 29, 39];
ages.sort((a,b) => b - a)
console.log(ages)

// Exercise 3
const prices = [99, 150, 75, 120, 200];
prices.sort((a,b) => b - a)
console.log(prices)

// Exercise 4.
const projects = [
    { name: 'Project A', duration: 12, status: 'completed' },
    { name: 'Project B', duration: 8, status: 'ongoing' },
    { name: 'Project C', duration: 10, status: 'ongoing' },
    { name: 'Project D', duration: 6, status: 'completed' }
  ];
const ongoingProjects =  projects.filter( (p) => p.status === "ongoing" )
ongoingProjects.sort( (a,b) => a.duration - b.duration )
console.log(ongoingProjects) 

// Exercise 5
const projects2 = [
  { name: 'Project A', duration: 12, status: 'completed' },
  { name: 'Project B', duration: 8, status: 'ongoing' },
  { name: 'Project C', duration: 10, status: 'ongoing' },
  { name: 'Project D', duration: 6, status: 'completed' }
];
const completedProjects = projects2.filter((p) => p.status === "completed")
completedProjects.sort((a,b) => a-b)
console.log(completedProjects)

// Exercise 6
const projects3 = [
  { name: 'Project A', duration: 12, status: 'completed' },
  { name: 'Project B', duration: 8, status: 'ongoing' },
  { name: 'Project C', duration: 10, status: 'ongoing' },
  { name: 'Project D', duration: 6, status: 'completed' }
];
projects3.sort( (a,b) => a.duration - b.duration)
console.log(projects3)

// Exercise 7
const gadgets = [
  { name: 'iPhone', brand: 'Apple', quantity: 2 },
  { name: 'Galaxy S21', brand: 'Samsung', quantity: 5 },
  { name: 'iPad', brand: 'Apple', quantity: 3 },
  { name: 'Pixel 5', brand: 'Google',quantity: 1 }
];
const filterByBrand = gadgets.filter( (e) => e.brand === "Apple" )
filterByBrand.sort(( a,b ) => a-b )
console.log(filterByBrand)

// Exercise 8
const products4 = [
  { name: 'Laptop', price: 1000 },
  { name: 'Smartphone', price: 800 },
  { name: 'Tablet', price: 600 },
  { name: 'Monitor', price: 300 },
  { name: 'Keyboard', price: 100 }
]
products4.sort((a,b) => a.price - b.price )
console.log(products4)

// Exercise 9
const cars = [
  { make: 'Toyota', model: 'Camry', year: 2015 },
  { make: 'Honda', model: 'Accord', year: 2008 },
  { make: 'Tesla', model: 'Model 3', year: 2020 },
  { make: 'Ford', model: 'Fusion', year: 2009 }
];
cars.sort((a,b) => a.year - b.year)
console.log(cars)

// Exercise 10
const athletes = [
  { name: 'John', score: 85 },
  { name: 'Mike', score: 92 },
  { name: 'Sara', score: 88 },
  { name: 'Linda', score: 95 }
];
const newAthletes = athletes.filter( (e) => e.score >= 90 )
console.log(newAthletes)

// Exercise 11
const students = [
  { name: 'Alex', grade: 'B', marks : 75 },
  { name: 'Bella', grade: 'A',marks : 90 },
  { name: 'Chris', grade: 'C', marks : 58 },
  { name: 'Diana', grade: 'A', marks : 80 }
];
let studentGrade = students.filter( (e) => e.grade === "A" )
studentGrade.sort((a,b) => b.marks - a.marks)
console.log(studentGrade)

// Exercise 12
const employees = [
  { name: 'Raman', department: 'Engineering', salary: 70000 },
  { name: 'Samiksha', department: 'Marketing', salary: 55000 },
  { name: 'Ronak', department: 'Engineering', salary: 80000 },
  { name: 'Siddharth', department: 'Sales', salary: 60000 }
];
let employeeDepartment = employees.filter( (e) => e.department === "Engineering" )
employeeDepartment.sort((a,b) => b.salary - a.salary)
console.log(employeeDepartment)

// Exercise 13
const employees2 = [
  { name: 'Raman', department: 'Engineering', salary: 70000 },
  { name: 'Samiksha', department: 'Marketing', salary: 55000 },
  { name: 'Ronak', department: 'Engineering', salary: 50000 },
  { name: 'Kevin', department: 'Marketing', salary: 50000 },
  { name: 'Siddharth', department: 'Sales', salary: 60000 }
];
let employeeDepartment2 = employees2.filter( (e) => e.department === "Marketing" )
employeeDepartment2.sort((a,b) => a.salary - b.salary)
console.log(employeeDepartment2)

// Exercise 14
const employees3 = [
  { name: 'Eve', department: 'Engineering', salary: 70000 },
  { name: 'Sam', department: 'Marketing', salary: 55000 },
  { name: 'John', department: 'Engineering', salary: 80000 },
  { name: 'Lucy', department: 'Sales', salary: 60000 }
];
const employeeSalary = employees3.filter((e) => e.salary >= 60000)
employeeSalary.sort((a,b) => b.salary - a.salary)
console.log(employeeSalary)

// Exercise 15
const employees4 = [
  { name: 'Eve', department: 'Engineering', salary: 70000 },
  { name: 'Sam', department: 'Marketing', salary: 55000 },
  { name: 'John', department: 'Engineering', salary: 80000 },
  { name: 'Lucy', department: 'Sales', salary: 60000 }
];
const employeeLessSalary = employees4.filter((e) => e.salary < 70000)
employeeLessSalary.sort((a,b) => a.salary - b.salary)
console.log(employeeLessSalary)