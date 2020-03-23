const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// mind the order
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

var clientNewToDoS = ["Buy Food", "Learn Hebrew", "Learn d3.js", "Learn Web Development", "Shopping","Pray", "Read the Bible"];

app.get("/", function(req, res) {
  // res.send("Hello!");
  var today = new Date();
  var currentDay = today.getDay();
  var day = "";
  // create a template to render our Weekday
  // var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // day = dayArray[currentDay];

  // this only renders Weekday or Weekend using the variables declared above before the dayArray.
  // if (currentDay === 6 || currentDay === 0) {
  //   day = "Weekend";
  // } else {
  //   day = "Weekday"
  // };

  //Further alternative
  // Check: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  day = today.toLocaleDateString("en-US", options);


  res.render("list", {
    // note, clientNewToDo is expressed in post request below
    whichDay: day,
    whatIsNew: clientNewToDoS
  });
});

app.post("/", function(req, res) {
  clientNewToDo = req.body.newToDo;
// mind the "S" one is a sinle object populatin the aaray
  clientNewToDoS.push(clientNewToDo);

  res.redirect("/");
})

app.listen(3000, function() {
  console.log("App running on port 3000");
})
