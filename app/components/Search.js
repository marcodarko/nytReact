// Include React
var React = require("react");

var AjaxPromise= require('ajax-promise');

var Article = require('./models/article.js');


// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Search = React.createClass({

searchNYT: function(event){

	event.preventDefault;

	var myTopic = document.getElementById("topicInput").value;
	if(!myTopic){
		myTopic = "Cats";
	}

	var myStart = document.getElementById("startYearInput").value;
	if (!myStart){
		myStart = "20000101";
	} 

	var myEnd = document.getElementById("endYearInput").value;
	if (!myEnd){
		myEnd = "20171231";
	} 

	// this.setState({
	// 	topic: myTopic,
	// 	startYear: myStart,
	// 	endYear: myEnd
	// });

	var authKey= "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

	var myURL= "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
	authKey + "&q="+myTopic+"&begin_date="+myStart+"&end_date="+myEnd;

	AjaxPromise( myURL ).then(data =>{

		var NYTResults= data.response.docs;

		// PASS STATE TO RESULT COMPONENT
		// this.setState({
		// 	myResults: data
		// });

		// INSTEAD SAVE TO MONGO
		for (i=0, i< NYTResults.length; i++){

			var newArticle = new Article({
				link: NYTResults[i].web_url,
				title: NYTResults[i].headline.main
			});

			newArticle.save(function(error, saved) {
	          // If there's an error during this operation
	          if (error) {
	            console.log("ERROR SAVING ARTICLE: "+error);
	          });
		};

	});
  		
  },
  // Here we render the function
  render: function() {

    return (
  		<div>
	  		<form onSubmit={this.searchNYT}>
	  			<input type="text" placeholder="Topic" id="topicInput"></input>
	  			<input type="text" placeholder="Start Year YYYY/MM/DD" id="startYearInput"></input>
	  			<input type="text" placeholder="End Year YYYY/MM/DD" id="endYearInput"></input>
	  			<input className="btn btn-lg btn-primary" type="submit"></input>
	  		</form>
  		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = Search;



