

## Question 1: Total Distance Covered

**Endpoint:** `/total-distance`

**Method:** `GET`

**Query Parameters:**
- `distance1` (float)
- `distance2` (float)

**Description:** Calculates the total distance covered by adding two trips.

**API Call:** `http://localhost:3000/total-distance?distance1=5.5&distance2=10.2`

**Expected Output:** `15.7`

**Code Snippet:**
```javascript
app.get('/total-distance', (req, res) => {
    let distance1 = parseFloat(req.query.distance1);
    let distance2 = parseFloat(req.query.distance2);
    let totalDistance = distance1 + distance2;
    res.send(totalDistance.toString());
});
Question 2: Total Time Spent
Endpoint: /total-time

Method: GET

Query Parameters:

time1 (float)
time2 (float)
time3 (float)
Description: Calculates the total time spent on multiple activities.

API Call: http://localhost:3000/total-time?time1=1.5&time2=2.0&time3=0.5

Expected Output: 4.0

Code Snippet:

javascript
Copy code
app.get('/total-time', (req, res) => {
    let time1 = parseFloat(req.query.time1);
    let time2 = parseFloat(req.query.time2);
    let time3 = parseFloat(req.query.time3);
    let totalTime = time1 + time2 + time3;
    res.send(totalTime.toString());
});
Question 3: Average Speed
Endpoint: /average-speed

Method: GET

Query Parameters:

totalDistance (float)
totalTime (float)
Description: Calculates the average speed by dividing the total distance by the total time.

API Call: http://localhost:3000/average-speed?totalDistance=150&totalTime=3

Expected Output: 50

Code Snippet:

javascript
Copy code
app.get('/average-speed', (req, res) => {
    let totalDistance = parseFloat(req.query.totalDistance);
    let totalTime = parseFloat(req.query.totalTime);
    let averageSpeed = totalDistance / totalTime;
    res.send(averageSpeed.toString());
});
Question 4: Estimated Time of Arrival (ETA)
Endpoint: /eta

Method: GET

Query Parameters:

distance (float)
speed (float)
Description: Calculates the estimated time of arrival by dividing the distance by the speed.

API Call: http://localhost:3000/eta?distance=120&speed=60

Expected Output: 2

Code Snippet:

javascript
Copy code
app.get('/eta', (req, res) => {
    let distance = parseFloat(req.query.distance);
    let speed = parseFloat(req.query.speed);
    let eta = distance / speed;
    res.send(eta.toString());
});
Question 5: Total Calories Burned
Endpoint: /total-calories

Method: GET

Query Parameters:

duration1 (float)
duration2 (float)
caloriesPerMinute (float)
Description: Calculates the total calories burned based on activity duration and calories burned per minute.

API Call: http://localhost:3000/total-calories?duration1=30&duration2=45&caloriesPerMinute=10

Expected Output: 750

Code Snippet:

javascript
Copy code
app.get('/total-calories', (req, res) => {
    let duration1 = parseFloat(req.query.duration1);
    let duration2 = parseFloat(req.query.duration2);
    let caloriesPerMinute = parseFloat(req.query.caloriesPerMinute);
    let totalCalories = (duration1 + duration2) * caloriesPerMinute;
    res.send(totalCalories.toString());
});
Question 6: Interest Earned on Savings Account
Endpoint: /interest-earned

Method: GET

Query Parameters:

principal (float)
rate (float)
time (float)
Description: Calculates the interest earned on a savings account using the formula (principal * rate * time) / 100.

API Call: http://localhost:3000/interest-earned?principal=1000&rate=5&time=2

Expected Output: 100

Code Snippet:

javascript
Copy code
app.get('/interest-earned', (req, res) => {
    let principal = parseFloat(req.query.principal);
    let rate = parseFloat(req.query.rate);
    let time = parseFloat(req.query.time);
    let interestEarned = (principal * rate * time) / 100;
    res.send(interestEarned.toString());
});