// Include React
var React = require("react");


// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Saved = React.createClass({

	loadSavedArticles: function(){

		Article.find({ saved: true },found =>{

			this.setState({
				savedArticleArray: found
			});

		});

	},

  // Here we render the function
  render: function() {

    return (
    	<div>
  		{this.state.savedArticleArray.map(art, i){
  			<div className="jumbotron" key={art._id}>
  				<a href={art.link} target="_blank">SAVED: {art.healine}</a>
  			</div>
  		}}
  		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = Saved;