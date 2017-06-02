// Include React
var React = require("react");
var axios = require('axios');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Search = React.createClass({

searchNYT: function(event){

	event.preventDefault;

	var myTopic = document.getElementById('topicInput');
	if(!myTopic){
		myTopic = "Cats";
	}

	var myStart =  document.getElementById('startYearInput');
	if (!myStart){
		myStart = "20000101";
	} 

	var myEnd =  document.getElementById('endYearInput');
	if (!myEnd){
		myEnd = "20171231";
	} 

	var authKey= "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + myTopic + "&begin_date=" + myStart + "&end_date=" + myEnd ;

	console.log("sending axios request");
	return axios.get(queryURL).done(data=>{

		var NYTResults= data.response.docs;
		console.log("NYT R: "+NYTResults);

	});


  },

  getResults: function(){

  	//return this.state.resultsArray;

  },
  // Here we render the function
  render: function() {

    return (
  		<div className="jumbotron">
  			<h3><span className="glyphicon glyphicon-search" aria-hidden="true"></span> Search for Articles</h3>
	  		<form onSubmit={this.searchNYT}>
	  			<input className="formInput" type="text" placeholder="Topic" id="topicInput" required></input><br/>
	  			<input className="formInput" type="text" placeholder="Start Year YYYY/MM/DD" id="startYearInput"></input><br/>
	  			<input className="formInput" type="text" placeholder="End Year YYYY/MM/DD" id="endYearInput"></input><br/>
	  			<input className="btn btn-lg btn-primary themeButton" type="submit"></input>
	  		</form>
  		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = Search;



