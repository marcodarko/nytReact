
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
var uri = "mongodb://heroku_hh5n6b27:p8v2o7n4v5fhiklklhunrff349@ds157641.mlab.com:57641/heroku_hh5n6b27";
//var uri = "mongodb://localhost/nytreact";

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
		if (err) res.send(err);

		res.json(found);
	});

});

router.put("/save/:ART", function(req, res){

	 var ART= req.params.ART;
	 console.log(ART);

	 Article.update({headline: ART},{ $set:{saved: true} }, function(err, updated){
			if(err){
				console.log(err);
			}
			else{
				console.log("got saved");
				res.end();
			}
		});

});



router.post('/saveNew', function(req, res){

	console.log("body H: "+ req.body.headline);
	console.log("body L: "+ req.body.link);

	var newArticle = new Article(
	{
		headline: req.body.headline,
		link: req.body.link
	});

	console.log("object: "+newArticle);

	newArticle.save(function(err, saved){
		if (err) res.send(err);
		
			console.log(saved);
			res.send(saved);
		
	})
	

});



// Export routes for server.js to use.
module.exports = router;



