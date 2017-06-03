// Include React
var React = require("react");
var axios = require('axios');
var CreateReactClass = require('create-react-class');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Saved = CreateReactClass({
  getInitialState() {
    return {
      savedArticleArray: [],
    };
  },

    loadUnsavedArticles: function(){
    
    axios.get('/saved').then(response=>{

      var articles = [];
      
      for (var key in response.data) {
        articles.push(response.data[key]);
      }

      this.setState({ savedArticleArray: articles });

      // console.log("1: "+this.state.articleArray);
      // console.log("2: "+this.state.articleArray.length);


    });


  },

	componentWillMount: function(){

		this.loadUnsavedArticles();

	},

  // Here we render the function
  render: function() {

    return (
    	<div className="jumbotron">
    	<h3>Saved Articles</h3>
  		{this.state.savedArticleArray.map((art, i) => {
  			<div className="jumbotron" key={art._id}>
  				<a href={art.link} target="_blank">SAVED: {art.headline}</a>
  			</div>
  		})}
  		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = Saved;