const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
// use date() anywhere it is needed just as express() is called
// console.log(date());

// mind the order
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

// For the serever to access our css it need be stored in the static file directory which is passed in as public below.
// Note that this time around, the linkk to the styles sheet must be in the .ejs file
app.use(express.static('public'));


const clientNewToDoS = ["Buy Food", "Learn Hebrew", "Learn d3.js", "Learn Web Development", "Shopping", "Pray", "Read the Bible"];
const workItems = [];

app.get("/", function(req, res) {
  // // res.send("Hello!");
  // let today = new Date();
  // let currentDay = today.getDay();
  // let day = "";
  // // create a template to render our Weekday
  // // let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // // day = dayArray[currentDay];
  //
  // // this only renders Weekday or Weekend using the letiables declared above before the dayArray.
  // // if (currentDay === 6 || currentDay === 0) {
  // //   day = "Weekend";
  // // } else {
  // //   day = "Weekday"
  // // };
  //
  // //Further alternative
  // // Check: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  // let options = {
  //   weekday: 'long',
  //   day: 'numeric',
  //   month: 'long'
  // };
  //
  // day = today.toLocaleDateString("en-US", options);
// getDate() also valid
let day = date.getDate();

  res.render("list", {
    // note, clientNewToDo is expressed in post request below
    listTitle: day,
    whatIsNew: clientNewToDoS
  });
});

app.post("/", function(req, res) {

  let clientNewToDo = req.body.newToDo;
  // list is a button name in ejs
  if (req.body.list === "Work") {
    workItems.push(clientNewToDo);
      res.redirect("/work");
  } else {
    // mind the "S" one is a sinle object populatin the aaray
    clientNewToDoS.push(clientNewToDo);
    res.redirect("/");
  }


});

//Create work route.
app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: 'Work List',
    whatIsNew: workItems
  });
});

app.post("/work", (req, res) => {
  let clientNewToDo = req.body.clientNewToDo
  workItems.push(clientNewToDo)

  res.redirect("/work");
})
// create about route
app.get("/about", (req, res) => {
  res.render('about');
})
app.listen(3000, function() {
  console.log("App running on port 3000");
})
