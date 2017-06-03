// Include React
var React = require("react");
// var Article = require('./models/article.js');
var AjaxPromise= require('ajax-promise');
var CreateReactClass = require('create-react-class');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Saved = CreateReactClass({
  getInitialState() {
    return {
      savedArticleArray: [],
    };
  },

	loadSavedArticles: function(){




	},

	componentWillMount: function(){

		this.loadSavedArticles();

	},

  // Here we render the function
  render: function() {

    return (
    	<div className="jumbotron">
    	<h3>Saved Articles</h3>
  		{this.state.savedArticleArray.map((art, i) => {
  			<div className="jumbotron" key={art._id}>
  				<a href={art.link} target="_blank">SAVED: {art.healine}</a>
  			</div>
  		})}
  		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = Saved;