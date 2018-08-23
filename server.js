var cheerio = require("cheerio");
var request = require("request");
var mongoose = require("mongoose");
// Database configuration

var Trend = require("./models/fashionTrend");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var express = require("express");
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 3500;
var app = express();
app.use(express.static("public"));

app.engine(".hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", ".hbs");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/scrape", function(req, res){
  request("https://www.fibre2fashion.com/industry-article/free-fashion-industry-article/7", function(err, response, html){
    var $ = cheerio.load(html);
    var results = [];
   $(".related-articles-box").each(function(i, data){
       var title = $(data).find(".blue-heading").text();
       var link = $(data).find("a").attr("href");
       var img = $(data).find("img").attr("src");
       results.push({
           title: title,
           link: link,
           imgSrc: img
       });
       var newTrend = new Trend({
         title: title,
         link: link,
         imgSrc: img
       });
       Trend.create(newTrend, function(err){
         if(err){
           console.log(err);
         }
       });
   });
  res.send("Scraped it");
});

    app.get("/api", function(req, res){
      Trend.remove({}, function(err){
        if(err){
          console.log(err);
        }
        Trend.find({}, function(err, data){
          console.log("\n--------------------------\n");
          console.log(data);
          res.json(data);
          console.log("\n--------------------------\n");
        });
      });
    });
console.log(results);
});

app.listen(PORT, function() {
  console.log("Listening to http://localhost:" + PORT);
});
