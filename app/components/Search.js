// Include React
var React = require("react");
var axios = require('axios');
var CreateReactClass = require('create-react-class');
var Results = require("./Results");
var Saved = require("./Saved");

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Search = CreateReactClass({

 getInitialState() {
    return {
      results: [],
    };
 },

searchNYT: function(event){

	event.preventDefault();


	var myTopic = this.state.topic.trim();
	var myStart = this.state.startYear.trim();
	var myEnd = this.state.endYear.trim();

	// console.log("T: "+myTopic);
	// console.log("S: "+myStart);
	// console.log("E: "+myEnd);

	var authKey= "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

	var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + myTopic + "&begin_date=" + myStart + "0101&end_date=" + myEnd+"1230";

	console.log("sending axios request");
	
	axios.get(queryURL).then(response=>{

		console.log("got response!");

		var NYTResults= response.data.response.docs;
		//console.log(NYTResults[0]);

		for(let i=0; i<NYTResults.length; i++){

				console.log("pushing "+i);
				var newObject= {
					headline: NYTResults[i].headline.main,
					link: NYTResults[i].web_url
				}

				this.saveArticles(newObject);
				
				
		}


	});

	


  },

  getResults: function(){

  	//return this.state.resultsArray;

  },

  setTopic: function(event){

  	this.setState({
  		topic: event.target.value
  	})
  },

   setStart: function(event){

  	this.setState({
  		startYear: event.target.value
  	})
  },

   setEnd: function(event){

  	this.setState({
  		endYear: event.target.value
  	})
  },

  saveArticles: function(article){

  		axios.post('/saveNew', article);

  },

  // Here we render the function
  render: function() {

    return (
  		<div className="jumbotron">
  			<h3><span className="glyphicon glyphicon-search" aria-hidden="true"></span> Search for Articles</h3>
	  		<form onSubmit={this.searchNYT}>
	  			<input className="formInput" type="text" placeholder="Topic" onChange={this.setTopic} required></input><br/>
	  			<input className="formInput" type="text" placeholder="Start Year" id="startYearInput" onChange={this.setStart}></input><br/>
	  			<input className="formInput" type="text" placeholder="End Year" id="endYearInput" onChange={this.setEnd}></input><br/><br/>
	  			<input className="btn btn-lg btn-primary themeButton" type="submit"></input>
	  		</form>
	  		<br/>
	  		<hr/>
	  		<Results/>
  			<Saved/>
  		</div>
  		
    );
  }

});

// Export the component back for use in other files
module.exports = Search;



