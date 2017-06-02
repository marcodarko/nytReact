
// Require request and cheerio. This makes the scraping possible
var request = require("request");

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

router.get('/saved', function(req, res){

	Article.find({saved: true}, function(err, found){
		if (err) throw err;
		res.json(found);
	});

});

router.get('/unsaved', function(req, res){

	Article.find({saved: false}, function(err, found){
		if (err) throw err;
		res.json(found);
	});

});

router.put("/save/:ART", function(req, res){

	 var ART= req.params.ART;

	 Article.update({title: ART},{ $set:{saved: true} }, function(err, updated){
			if(err){
				console.log(err);
			}
			else{
				res.end();
			}
		});

});



router.get('/searchNYT', function(req, res){

	var myTopic = req.body.topic;
	if(!myTopic){
		myTopic = "Cats";
	}

	var myStart = req.body.topic;
	if (!myStart){
		myStart = "20000101";
	} 

	var myEnd = req.body.topic;
	if (!myEnd){
		myEnd = "20171231";
	} 

	var authKey= "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + myTopic + "&begin_date=" + myStart + "&end_date=" + myEnd ;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(data=>{

		var NYTResults= data.response.docs;

		res.json(NYTResults);
	});
	

});



// Export routes for server.js to use.
module.exports = router;



