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
db.on("error", function(error) {
    console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
    res.send("Hey Homie!");
});

// Retrieve data from the db
app.get("/all", function(req, res) {
    db.scrapedData2.find({}, function(error, found) {
      if (error) {
        console.log(error);
      }
      else {
        res.json(found);
      }
    });
});