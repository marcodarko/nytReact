
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var express = require("express");
var Article = require('../models/article.js');

// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");

mongoose.Promise = Promise;

var router = express.Router();

// // Create the Schema class
// var Schema = mongoose.Schema;

// URI's
//var uri = "mongodb://heroku_hh5n6b27:p8v2o7n4v5fhiklklhunrff349@ds157641.mlab.com:57641/heroku_hh5n6b27";
var uri = "mongodb://localhost/nytreact";

mongoose.connect(uri);

// mongoose.model('Actor', new Articles);

var db = mongoose.connection;


// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



router.get('/', function(req, res){

  res.send('index.html');

});



// Export routes for server.js to use.
module.exports = router;



