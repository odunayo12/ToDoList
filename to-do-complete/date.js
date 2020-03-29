// console.log(module);
exports.getDate = function () {
  // res.send("Hello!");
  const today = new Date();
  // const currentDay = today.getDay();
  const day = "";
  // create a template to render our Weekday
  // const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // day = dayArray[currentDay];

  // this only renders Weekday or Weekend using the constiables declared above before the dayArray.
  // if (currentDay === 6 || currentDay === 0) {
  //   day = "Weekend";
  // } else {
  //   day = "Weekday"
  // };

  //Further alternative
  // Check: https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  return today.toLocaleDateString("en-US", options);
}

exports.getDay = function() {
  // res.send("Hello!");
  const today = new Date();
  const day = "";

  const options = {
    weekday: 'long'
  };

  return today.toLocaleDateString("en-US", options);
}
