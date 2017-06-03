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

        var LIST;

    if(this.state.savedArticleArray.length) {
      LIST= this.state.savedArticleArray.map(function(item, index) {
        //console.log(JSON.stringify(item));
        if(item) {          
          return (
                 <div className="jumbotron" key={item._id}>
                  <a className="themeButton" href={item.link} target="_blank">SAVED: {item.headline}</a>
                </div>
                )
        } else {
          return <h4>NOTHING</h4>
        }
          
      });
    }

    return (
    	<div className="jumbotron">
    	<h3>Saved Articles</h3>
  		{
        LIST
      }
  		</div>
    );
  }

});

// Export the component back for use in other files
module.exports = Saved;