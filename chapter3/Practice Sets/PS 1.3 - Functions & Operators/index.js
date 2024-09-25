// Exercise 1: Report Card Generation
const studentData = [
    { studentName: 'John', rollNo: 201, science: 88, history: 75, geography: 90 },
    { studentName: 'Alice', rollNo: 202, science: 92, history: 85, geography: 88 },
    { studentName: 'Bob', rollNo: 203, science: 78, history: 89, geography: 91 }
  ];
let generateReportCard = (studentData,rollNo) =>{
    let student = studentData.find((e) => e.rollNo === rollNo)
    console.log(`===== Report Card for ${student.studentName} ======`);
    console.log(`Roll No. : ${student.rollNo}`);
    console.log('------');
    console.log('Marks:');
    console.log('------');
    console.log(`science: ${student.science}`);
    console.log(`history: ${student.history}`);
    console.log(`geography: ${student.geography}`);
    console.log('------ ------ ------');
}
generateReportCard(studentData,201)

// Exercise 2: Filter Students by Subject Marks
let filterStudentsByScienceCutoff = (studentData,cutoff ) => {
    let student = studentData.filter((e) => e.science >= cutoff )
    return student
}
console.log(filterStudentsByScienceCutoff(studentData,80))

// Exercise 3: Filter Students by Average Marks 
let filterStudentsByAverageMarks = (studentData, cutoff) => {
   
    for(let i = 0; i < studentData.length ; i++){
       let averageMarks = ( studentData[i].science + studentData[i].history + studentData[i].geography ) / 3
        if (averageMarks >= cutoff) {
            console.log(`${studentData[i].studentName} has average marks ${averageMarks.toFixed(2)}`);
          }
    }

}
filterStudentsByAverageMarks(studentData, 85)

// Exercise 4: Find Student with Highest Average Marks.
let getStudentWithHighestAverageMarks = () => {
    let highestAverage = 0;
    let topStudent = null;
    for(let i = 0; i < studentData.length ; i++){
       let averageMarks = ( studentData[i].science + studentData[i].history + studentData[i].geography ) / 3
       if (averageMarks > highestAverage) {
        highestAverage = averageMarks;
        topStudent = studentData[i];
      }
    }
    if (topStudent) {
        console.log(`${topStudent.studentName} has the highest average marks of ${highestAverage.toFixed(2)}`);
      }

}
getStudentWithHighestAverageMarks()

// Exercise 5: Convert Hours to Minutes
let convertToMinutes = (hours) => {
    let minutes = hours * 60;
    return `${hours} hours = ${minutes} minutes`;
  }
console.log(convertToMinutes(2))

//Exercise 6: Count Occurrences of Character in String
let countOccurrences = (str, char) => {
    let array = []
    let count = 0
    for(let i = 0; i < str.length; i++ ){
      if(str[i] === char){
        count++;
      }
    }
    console.log(`Character ${char} repeats ${count} times`)
}
countOccurrences('hello world','o')

// Exercise 7: Find the Sum of All Even Numbers in an Array
let numbers = [1, 2, 3, 4, 5, 6];
let sumOfEvenNumbers =  (arr) => {
  let  sum = 0;
  for(let i = 0; i < arr.length; i++){
    if(arr[i] % 2 === 0){
      sum += arr[i];
    }
  }
  console.log(`The sum of all even numbers is ${sum}`)
}
sumOfEvenNumbers(numbers)
