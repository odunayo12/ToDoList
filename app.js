const express = require('express');
const bodParser = require('body-parser');

const app = express();

app.get("/", function (req, res) {
  // res.send("Hello!");
  var today = new Date();
  var currentDay = today.getDay();
  if (currentDay === 6 || currentDay === 0) {
    res.send("Weekend is here");
  } else {
    res.send("Keep working...");
  }
});


app.listen(3000, function () {
  console.log("App running on port 3000");
})
