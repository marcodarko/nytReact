// Include React
var React = require("react");
// var Article = require('../../models/article.js');
var ListItem = require('./ListItem.js');
var AjaxPromise = require('ajax-promise');
var axios = require('axios');
var CreateReactClass = require('create-react-class');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Results = CreateReactClass({

  getInitialState() {
    return {
      articleArray: [],
    };
  },

	loadArticles: function(){

		//console.log("load articles IN");
		
		axios.get('/unsaved').then(response=>{

			console.log(response.data.length);
			console.log(typeof response.data);
			console.log(response.data[0]);

			
			

		});


	},

  componentDidMount: function(){

		this.loadArticles();

	},

	render: function(){
		//console.log(this.state);
		return (
			<div className="jumbotron resultsBox">
				<h3>Results</h3>
				<table className="table">
		  			{this.state.articleArray.map((singleArticle, i)=>{
		  				return <ListItem title={singleArticle.headline} url={singleArticle.link} key={singleArticle._id}/>
		  			})}
	  			</table>
  			</div>
  			);
	}

});

// Export the component back for use in other files
module.exports = Results;