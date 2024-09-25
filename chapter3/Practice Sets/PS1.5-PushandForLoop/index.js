// Exercise 1
let numbers = [2, 4, 6, 10, 5];
let doubleValue = (array) => {
    let doubleArray = []
    for(let i = 0; i < array.length ; i++){
        doubleArray.push(array[i] * 2)
    }
    return doubleArray
}
console.log(doubleValue(numbers)); 

// Exercise 2
const students = [
    { name: 'Alice', grade: 'A' },
    { name: 'Bob', grade: 'B' },
    { name: 'Charlie', grade: 'A' },
    { name: 'David', grade: 'C' }
  ];
let nameWithGradeA = (students, value) => {
    let names = []
    for(let i = 0; i < students.length ; i++){
      if(students[i].grade === value){
        names.push(students[i].name)
      }
    }
    return names
}
console.log(nameWithGradeA(students,  "A"));


// Exercise 3
const prices = [99, 150, 75, 120, 200];
let priceGreaterThan100 = (prices, value) => {
    let price = []
    for(let i = 0; i < prices.length ; i++){
      if(prices[i] > value){
        price.push(prices[i])
      }
    }
    return price
}
console.log(priceGreaterThan100(prices, 100));

// Exercise 4
const ages = [12, 15, 22, 29, 34];
let evenAges = (ages) => {
    let evenAge = []
    for(let i =  0; i < ages.length ; i++){
        if(ages[i] % 2 === 0){
            evenAge.push(ages[i])
        }
    }
    return evenAge
}
console.log(evenAges(ages))


// Exercise 5
const sports = ['Soccer', 'Basketball', 'Tennis'];
let sportsWithQMark  = (sports) => {
    let  sportsWithQ = []
    for(let i = 0 ; i < sports.length ; i++ ){
        sportsWithQ.push(sports[i] + "?")
    }
    return sportsWithQ
}
console.log(sportsWithQMark(sports))

// Exercise 6
let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = (numbers) => {
    let even = []
    for(let i =  0; i < numbers.length ; i++){
        if(numbers[i] % 2 === 0){
            even.push(numbers[i])
        }
    }
    return even
}
console.log(evenNumbers(number))

// Exercise 7
let oddNumbers = (numbers) => {
    let odd = []
    for(let i =  0; i < numbers.length ; i++){
        if(numbers[i] % 2 === 1){
            odd.push(numbers[i])
        }
    }
    return odd
}
console.log(oddNumbers(number))

// Exercise 8
const names = ['John', 'Doe', 'Jane', 'Smith'];
let concatenateString = (names) => {
    let str = ''
    for(let i =  0; i < names.length ; i++){
        str +=  names[i] 
        if(i <  names.length - 1){
            str += "-"
        }

    }
    return str
}
console.log(concatenateString(names))

// Exercise 9
const strings = ['Hello', 'world', 'from', 'practice','set'];    //  str = strings.join(" ")
let joinString = (strings) => {
    let string = ''
    for(let i =  0; i < strings.length ; i++){
        string +=  strings[i]  + " "
    }
    return string
}
console.log(joinString(strings))

// Exercise 10
const cars = [
    { make: 'Toyota', model: 'Camry', year: 2015 },
    { make: 'Honda', model: 'Accord', year: 2008 },
    { make: 'Tesla', model: 'Model 3', year: 2020 },
    { make: 'Ford', model: 'Fusion', year: 2009 }
  ];
let carsWithAfter2010 = (cars, year) => {
    let car = []
    for(let i =  0; i < cars.length ; i++){
       if( cars[i].year > year){
        car.push(cars[i])
       }
    }
    return car
}
console.log(carsWithAfter2010(cars,  2010))

// Exercise 12
const temperatures = [0, 20, 37, 100];
let convertIntoFahrenheit = (temperatures) => {
    let Fahrenheit = []
    for(let i =  0; i < temperatures.length ; i++){
      Fahrenheit.push((temperatures[i] * 9/5) + 32)
    }
    return Fahrenheit
}
console.log(convertIntoFahrenheit(temperatures))

// Exercise 13.
const scores = [10, 22, 25, 33, 40, 55];
let multiplesOfFive = (scores) => {
    let multiple = []
    for(let i =  0; i < scores.length ; i++){
        if(scores[i] % 5 === 0){
            multiple.push(scores[i])
        }
    }
    return multiple
}
console.log(multiplesOfFive(scores))

// Exercise 14
const events = [
    { title: 'Concert', date: '2022-08-10', location: 'New York' },
    { title: 'Art Exhibition', date: '2022-09-12', location: 'Los Angeles' },
    { title: 'Tech Conference', date: '2022-10-05', location: 'New York' }
  ];
let titleOfEvent = (events, value) => {
    let titles = []
    for(let i = 0; i < events.length ; i++){
      if(events[i].location === value){
        titles.push(events[i].title)
      }
    }
    return titles
}
console.log(titleOfEvent(events, 'New York' ));

// Exercise 15
const age = [20, 25, 30, 35];
let addedValueTen = (age, value) => {
    let array = []
    for(let i = 0; i < age.length ; i++){
        array.push(age[i] + value)
    }
    return array
}
console.log(addedValueTen(age, 10)); 