// Include React
var React = require("react");
// var Article = require('../../models/article.js');
var ListItem = require('./ListItem.js');
var AjaxPromise = require('ajax-promise');
var axios = require('axios');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Results = React.createClass({

  getInitialState() {
    return {
      articleArray: [],
    };
  },

	loadArticles: function(){
			AjaxPromise.get('/unsaved').then(found=>{
				this.setState({
					articleArray: found
				});
		});
	},
  componentDidMount: function(){

		this.loadArticles();

	},

	render: function(){
		//console.log(this.state);
		return (
			<div className="jumbotron">
			<h2>Results</h2>
			<table className="table">
  			{this.state.articleArray.map(function(singleArticle, i){
  				return <ListItem title={singleArticle.headline} url={singleArticle.link} key={singleArticle._id}/>
  			})}
  			</table>
  			</div>
  			);
	}

});

// Export the component back for use in other files
module.exports = Results;