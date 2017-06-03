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
		
		axios.get('/unsaved').then(response=>{

			var articles = [];
			
			for (var key in response.data) {
				articles.push(response.data[key]);
			}

			this.setState({ articleArray: articles });

			// console.log("1: "+this.state.articleArray);
			// console.log("2: "+this.state.articleArray.length);


		});


	},

  componentDidMount: function(){

		this.loadArticles();

	},

	render: function(){

		var LIST;

		if(this.state.articleArray.length) {
			LIST= this.state.articleArray.map(function(item, index) {
				//console.log(JSON.stringify(item));
				if(item) {					
					return <ListItem title={ item.headline} url={ item.link} key={ item._id}/>
				} else {
					return <ListItem title="EMPTY" url="www.blank.com" key="0"/>
				}
		   		
			});
		}

		return (
			<div className="jumbotron resultsBox">
				<h3>Results</h3>
				<table className="table">
					<tbody>
			  			{
			  				LIST
			  			}
		  			</tbody>
	  			</table>
  			</div>
  			);
	}

});

// Export the component back for use in other files
module.exports = Results;