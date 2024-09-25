// Exercise 1
let students = [
    { id: 1, name: 'John', grade: 'B' },
    { id: 2, name: 'Emily', grade: 'C' },
    { id: 3, name: 'David', grade: 'A' }
];
let updateById = (students, id, grade) => {
    for(let i = 0; i < students.length; i++){
        if(students[i].id === id){
            students[i].grade = grade
            return students;
        }
    }
}
console.log(updateById(students, 2, "A")  )

// Exercise 2
let products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Monitor', price: 300 },
    { id: 3, name: 'Keyboard', price: 100 }
];
let deleteProduct = (products, id) => {
    let productDelete = []
    for (let i = 0; i < products.length; i++) {
        if (products[i].id !== id) {
            productDelete.push(products[i]);
        }
      }
    return productDelete
}
console.log(deleteProduct(products, 3))


// Exercise 3
let employees = [
    { id: 1, name: 'John', department: 'Engineering' },
    { id: 2, name: 'Eve', department: 'Sales' },
    { id: 3, name: 'Mark', department: 'Marketing' }
  ];
let updateEmployees = (employees, id, department) => {
    for(let i = 0; i < employees.length; i++){
        if(employees[i].id === id){
            employees[i].department = department
            return employees;
        }
    }
}
console.log(updateEmployees(employees, 1 , 'Human Resources'))

// Exercise 4
let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
  ];  
let deleteBooks = (books, id) => {
    let booksDelete = []
    for (let i = 0; i < books.length; i++) {
        if (books[i].id !== id) {
            booksDelete.push(books[i]);
        }
      }
    return booksDelete
}
console.log(deleteBooks(books, 2))

// Exercise 5
let cars = [
    { id: 1, make: 'Toyota', year: 2015 },
    { id: 2, make: 'Honda', year: 2008 },
    { id: 3, make: 'Tesla', year: 2020 }
];  
let updateCars = (cars, id, year) => {
    for(let i = 0; i < cars.length; i++){
        if(cars[i].id === id){
            cars[i].year = year
            return cars;
        }
    }
}
console.log(updateCars(cars, 3 , 2021))

// Exercise 6
let gadgets = [
    { id: 1, name: 'iPhone', brand: 'Apple' },
    { id: 2, name: 'Pixel', brand: 'Google' },
    { id: 3, name: 'Galaxy', brand: 'Samsung' }
];
let deleteGadgets  = (gadgets, id) => {
    let gadgetsDelete = []
    for (let i = 0; i < gadgets.length; i++) {
        if (gadgets[i].id !== id) {
            gadgetsDelete.push(gadgets[i]);
        }
      }
    return gadgetsDelete
}
console.log(deleteGadgets(gadgets, 1))

// Exercise 7
let projects = [
    { id: 1, name: 'Project Alpha', duration: 12 },
    { id: 2, name: 'Project Beta', duration: 10 },
    { id: 3, name: 'Project Gamma', duration: 8 }
];
let updateProjects = (projects, id, duration) => {
    for(let i = 0; i < projects.length; i++){
        if(projects[i].id === id){
            projects[i].duration = duration
            return projects;
        }
    }
}
console.log(updateProjects(projects, 1, 14))

// Exercise 8
let restaurants = [
    { id: 1, name: 'Pasta Palace', cuisine: 'Italian' },
    { id: 2, name: 'Dragon Wok', cuisine: 'Chinese' },
    { id: 3, name: 'Burger Barn', cuisine: 'American' }
  ];
  let deleteRestaurant = (restaurants, id) => {
    let updatedRestaurants = [];
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].id !== id) {
        updatedRestaurants.push(restaurants[i]);
      }
    }
    return updatedRestaurants;
  }
  console.log(deleteRestaurant(restaurants, 2));
  
  // Exercise 9
  let athletes = [
    { id: 1, name: 'John', score: 85 },
    { id: 2, name: 'Mike', score: 92 },
    { id: 3, name: 'Sara', score: 88 }
  ];
  let updateAthleteScore = (athletes, id, newScore) => {
    for (let i = 0; i < athletes.length; i++) {
      if (athletes[i].id === id) {
        athletes[i].score = newScore;
        return athletes;
      }
    }
  }
  console.log(updateAthleteScore(athletes, 2, 95));
  
  // Exercise 10
  let movies = [
    { id: 1, title: 'Inception', rating: 8.8 },
    { id: 2, title: 'Titanic', rating: 7.8 },
    { id: 3, title: 'The Room', rating: 3.7 }
  ];
  let deleteMovie = (movies, id) => {
    let updatedMovies = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id !== id) {
        updatedMovies.push(movies[i]);
      }
    }
    return updatedMovies;
  }
  console.log(deleteMovie(movies, 3));
  
  // Exercise 11
  let cities = [
    { id: 1, name: 'Los Angeles', population: 4000000 },
    { id: 2, name: 'New York', population: 8175133 },
    { id: 3, name: 'Chicago', population: 2695598 }
  ];
  let updateCityPopulation = (cities, id, newPopulation) => {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].id === id) {
        cities[i].population = newPopulation;
        return cities;
      }
    }
  }
  console.log(updateCityPopulation(cities, 3, 8500000));
  
  // Exercise 12
  let courses = [
    { id: 1, title: 'Mathematics', duration: '3 months' },
    { id: 2, title: 'Physics', duration: '4 months' },
    { id: 3, title: 'Chemistry', duration: '5 months' }
  ];
  let deleteCourse = (courses, id) => {
    let updatedCourses = [];
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id !== id) {
        updatedCourses.push(courses[i]);
      }
    }
    return updatedCourses;
  }
  console.log(deleteCourse(courses, 1));
  
  // Exercise 13
  let pets = [
    { id: 1, name: 'Whiskers', type: 'Cat' },
    { id: 2, name: 'Rover', type: 'Fish' },
    { id: 3, name: 'Bella', type: 'Dog' }
  ];
  let updatePetType = (pets, id, newType) => {
    for (let i = 0; i < pets.length; i++) {
      if (pets[i].id === id) {
        pets[i].type = newType;
        return pets;
      }
    }
  }
  console.log(updatePetType(pets, 2, 'Dog'));
  
  // Exercise 14
  let computers = [
    { id: 1, brand: 'Apple', model: 'MacBook Pro' },
    { id: 2, brand: 'Dell', model: 'XPS 13' },
    { id: 3, brand: 'HP', model: 'Spectre x360' }
  ];
  let deleteComputer = (computers, id) => {
    let updatedComputers = [];
    for (let i = 0; i < computers.length; i++) {
      if (computers[i].id !== id) {
        updatedComputers.push(computers[i]);
      }
    }
    return updatedComputers;
  }
  console.log(deleteComputer(computers, 3));
  
  // Exercise 15
  let appliances = [
    { id: 1, name: 'Microwave', wattage: 1000 },
    { id: 2, name: 'Toaster', wattage: 800 },
    { id: 3, name: 'Blender', wattage: 500 }
  ];
  let updateApplianceWattage = (appliances, id, newWattage) => {
    for (let i = 0; i < appliances.length; i++) {
      if (appliances[i].id === id) {
        appliances[i].wattage = newWattage;
        return appliances;
      }
    }
  }
  console.log(updateApplianceWattage(appliances, 1, 1200));
  