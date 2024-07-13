let express = require('express');
let app = express()



/*
Question 1:
*/
app.get('/total-distance', (req, res) => {
  let distance1 = req.query.distance1;
  let distance2 = req.query.distance2;
  let totalDistance = parseFloat(distance1) + parseFloat(distance2);
  res.send(totalDistance.toString());
})




/*
Question 2:
*/

app.get("/total-time",(req, res) => {
  let time1 = req.query.time1;
  let time2 = req.query.time2;
  let time3 = req.query.time3;
  let totalTime = parseFloat(time1) + parseFloat(time2)  + parseFloat(time3)
  res.send(totalTime.toString())
})




/*
Question 3:
*/

app.get("/average-speed",(req, res) => {
  let totalDistance = req.query.totalDistance;
  let totalTime = req.query.totalTime;
  let averageSpeed = parseFloat(totalDistance) / parseFloat(totalTime);
  res.send(averageSpeed.toString())
})




//Question 4:

app.get("/eta",(req, res) => {
  let distance = parseFloat(req.query.distance);
  let speed = parseFloat(req.query.speed)
  let eta = distance/speed;

  res.send(eta.toString())
})




//Question 5:

app.get("/total-calories", (req, res) => {
  let dur1 = parseFloat(req.query.dur1)
  let dur2 = parseFloat(req.query.dur2)
  let caloriesPerMinute = parseFloat(req.query.caloriesPerMinute)
  let totalCalories = (dur1 * caloriesPerMinute) + (dur2 * caloriesPerMinute)
  res.send(totalCalories.toString())
})



// Question 6:
//http://localhost:3000/interest-earned?principal=1000&rate=5&time=2>

app.get("/interest-earned", (req, res) =>{
  let principle = parseFloat(req.query.principle)
  let rate = parseFloat(req.query.rate)
  let time = parseFloat(req.query.time)
  let interestEarned  = (principle * rate * time) / 100
  res.send(interestEarned.toString())
  
})




let PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})