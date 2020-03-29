//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let publishContent = "";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let postByClient = [];

// home route
app.get("/", (req, res) => {
  // res.send("<h1>Home</h1>")
    // let bodyLength = 100
    // let endingMarks = "..."
    // let postByClient = .substring(0, bodyLength - endingMarks.length) + endingMarks;
    // }

  // let postByClient = txtTruncate(postByClient)
  res.render("home", {
    homeIntro: homeStartingContent,
    postByClientToHome: postByClient
  });

});

// about route
app.get("/about", (req, res) => {
  res.render("about", {
    aboutPage: aboutContent
  });
});

// about route
app.get("/contact", (req, res) => {
  res.render("contact", {
    contactPage: contactContent
  });
});

// compose route
app.get("/compose", (req, res) => {
  res.render('compose');
});

app.post("/compose", (req, res) => {
  // the following object holds the post content in
  const composedObject = {
    postTitle: req.body.titleToPublish,
    postBody: req.body.bodyToPublish
  }
  postByClient.push(composedObject);
  // console.log(postByClient);
  res.redirect('/');
})

// parametized route
app.get("/posts/:topic", (req, res) => {
  // old version
  // https://expressjs.com/en/guide/routing.html
  for (var i = 0; i < postByClient.length; i++) {
    if (req.params.topic === postByClient[i].postTitle) {
      console.log("Match found!");
    }
  }
  // new version
  // let postPageTitle = req.params.topic
  postByClient.forEach((content) => {
    // we are able to use this because of the we are still in the for loop
    let postPageTitle = content.postTitle;
    let postpageBody = content.postBody;
    // .lowerCase convert both of the to same words from lodash
    if (_.lowerCase(req.params.topic) === _.lowerCase(content.postTitle)) {
      res.render("post", {
        postByClientToPostPageTitle: postPageTitle,
        postByClientToPostPageBody: postpageBody
      });
    }
  });


  // console.log(req.params.topic);
  // console.log(req.params.anyInterest);
})




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
