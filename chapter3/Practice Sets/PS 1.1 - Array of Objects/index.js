// Exercise 1
let studentArray = () => {
  const students = [
      { name: 'Alice', age: 19, grade: 'A' },
      { name: 'Bob', age: 17, grade: 'B' },
      { name: 'Charlie', age: 20, grade: 'C' },
      { name: 'David', age: 18, grade: 'B' }
    ]
  let array =  students.filter((e) => e.age > 18).map((e) => e.name)
  return array
}
console.log(studentArray())


