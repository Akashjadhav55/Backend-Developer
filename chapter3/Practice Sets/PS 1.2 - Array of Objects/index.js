// Exercise 1
const projects = [
    { name: 'Project A', duration: 12, status: 'completed' },
    { name: 'Project B', duration: 8, status: 'ongoing' },
    { name: 'Project C', duration: 10, status: 'ongoing' },
    { name: 'Project D', duration: 6, status: 'completed' }
  ];
let ongoingProjects = (projects) => {
    let ongoing = projects.filter(project => project.status === 'ongoing');
    let bag = []
    for(let i = 0; i < ongoing.length; i++){
        bag.push(ongoing[i].name)
    }
    return bag
}
console.log(ongoingProjects(projects))

// Exercise 2
const cities = [
    { name: 'New York', population: 8000000, country: 'USA' },
    { name: 'Toronto', population: 2800000, country: 'Canada' },
    { name: 'Los Angeles', population: 4000000, country: 'USA' },
    { name: 'London', population: 9000000, country: 'UK' }
  ];
let  citiesByCountry = (cities) => {
    let country = cities.filter((city) => city.country === "USA")
    return country
}
console.log(citiesByCountry(cities))

// Exercise 3
const songs = [
    { title: 'Song A', artist: 'Artist 1', duration: 4.5 },
    { title: 'Song B', artist: 'Artist 2', duration: 5.2 },
    { title: 'Song C', artist: 'Artist 3', duration: 3.8 },
    { title: 'Song D', artist: 'Artist 4', duration: 6.0 }
  ];
let songByDuration = (songs) => {
    let song = songs.find((song) => song.duration > 5)

    return { Title: song.title,  
             Artist: song.artist,  
             Duration: song.duration
            } 
}
console.log(songByDuration(songs))

// Exercise 4
const animals = [
    { species: 'Tiger', habitat: 'Forest', population: 3000 },
    { species: 'Elephant', habitat: 'Savannah', population: 5000 },
    { species: 'Panda', habitat: 'Bamboo Forest', population: 2000 },
    { species: 'Kangaroo', habitat: 'Grassland', population: 10000 }
];
let updateAnimalPopulation = (animals, species, newPopulation) => {
    let animal = animals.find((animal) => animal.species === species)
    if(animal){
        animal.population = newPopulation
        console.log(`The updated population for ${animal.species} is ${animal.population}`)
    }
}
updateAnimalPopulation(animals, "Elephant", 5500)

// Exercise 5
const players = [
    { name: 'Player A', team: 'Team 1', goals_scored: 22 },
    { name: 'Player B', team: 'Team 2', goals_scored: 18 },
    { name: 'Player C', team: 'Team 1', goals_scored: 25 },
    { name: 'Player D', team: 'Team 3', goals_scored: 15 }
];
let playerWithMostGoals = (players) => {
    let player = players.filter((play) => play.goals_scored > 20)
    console.log(player)
    let name =[];
    for(let i = 0; i<player.length; i++){
        name.push(player[i].name)
    }
    return name
}
console.log(playerWithMostGoals(players))

// Exercise 6
const companies = [
  { name: 'Company A', industry: 'Tech', employees: 500 },
  { name: 'Company B', industry: 'Finance', employees: 300 },
  { name: 'Company C', industry: 'Tech', employees: 700 },
  { name: 'Company D', industry: 'Healthcare', employees: 400 }
];
let  companiesInTech = (companies, Tech) => {
    let company = companies.filter((company) => company.industry === Tech )
    return company
}
console.log(companiesInTech(companies,  'Tech'))

// Exercise 7
const books = [
    { title: 'Book A', author: 'Author 1', pages: 150 },
    { title: 'Book B', author: 'Author 2', pages: 320 },
    { title: 'Book C', author: 'Author 3', pages: 290 },
    { title: 'Book D', author: 'Author 4', pages: 400 }
];
let bookSortByPages = (books) => {
    let sortedBooks = books.sort((a,b) => b.pages - a.pages)
    return sortedBooks
}
console.log(bookSortByPages(books))


// Exercise 8
const people = [
    { name: 'Person A', country: 'India', age: 35 },
    { name: 'Person B', country: 'USA', age: 28 },
    { name: 'Person C', country: 'India', age: 32 },
    { name: 'Person D', country: 'India', age: 24 }
];
let peopleFromIndia = (people) => {
    let peoples = people.filter((e) => {
        return e.country === 'India' &&  e.age > 30
    })
    let name = []
    for(let i = 0; i<peoples.length; i++){
        name.push(peoples[i].name)
    }
    return name
}
console.log(peopleFromIndia(people))