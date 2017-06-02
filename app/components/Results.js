// Include React
var React = require("react");
// var Article = require('../../models/article.js');
var ListItem = require('./ListItem.js');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Results = React.createClass({

	loadArticles: function(){

			AjaxPromise('/unsaved').then(found=>{

			this.setState({
				articleArray: found
			});
		});

	},
	componentWillMount: function(){

		this.loadArticles();

	},

	render: function(){

		<table className="table">
  			{this.state.articleArray.map(function(singleArticle, i){
  				return <ListItem title={singleArticle.headline} url={singleArticle.link} key={singleArticle._id}/>
  			})}
  		</table>
	}

});

// Export the component back for use in other files
module.exports = Results;

