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
