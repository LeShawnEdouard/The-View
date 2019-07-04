// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Reuire axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper-homework";
var collections = ["scrapedData2"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
    res.send("Hey Homie!");
});

// Retrieve data from the db
app.get("/all", function (req, res) {
  db.scrapedData2.find({}, function (error, found) {
    // Logs the error if found
    if (error) {
      console.log(error);
    }
    // Formats the response data in json format
    else {
      res.json(found);
    }
  });
});

// Scraping data from the site that will be added to the mongodb db
app.get("/scrape", function (req, res) {
  // Make a request via axios for the news section of ycombinator  
    axios.get("https://news.ycombinator.com/").then(function (response) {
      // Load the html body from axios into cheerio
        var $ = cheerio.load(response.data);
        // For each element with a "title" class
        $(".title").each(function (i, element) {
          // Save the text and href of each link enclosed in the current element
          var title = $(element).children("a").text();
          var link = $(element).children("a").attr("href");

            // If this found element had both a title and a link
            if (title && link) {
              // Insert the data in the scrapedData db
              db.scrapedData2.insert({
                title: title,
                link: link
              },
              function (err, inserted) {
                if (err) {
                // Log the error if one is encountered during the query
                console.log(err);
                }
                else {
                // Otherwise, log the inserted data
                console.log(inserted);
                }
            });
        }
    });


});
  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
  })

  // Listen on port 3000
  app.listen(3000, function () {
    console.log("App running on port 3000!");
  });