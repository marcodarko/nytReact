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

			// console.log(response.data.length);
			// console.log(typeof response.data);
			// console.log(response.data[0]);

			var articles = [];
			
			for (var key in response.data) {
				articles.push(response.data[key]);
			}

			this.setState({ articleArray: articles });

			console.log("1: "+this.state.articleArray);

			// this.state.articleArray= response.data

			console.log("2: "+this.state.articleArray.length);
			// console.log("3: "+this.state.articleArray[0].headline);
			// console.log(this.state.articleArray[0]);
			// console.log(typeof this.state.articleArray[0]);
			// {this.state.articleArray.map((singleArticle, i)=>{
		 //  				return (<ListItem title={singleArticle.headline} url={singleArticle.link} key={singleArticle._id}/>)
		 //  			})}

		});


	},

  componentDidMount: function(){

		this.loadArticles();

	},

	render: function(){
		//console.log(this.state);
		var x;

		if(this.state.articleArray.length) {
			x= this.state.articleArray.map(function(item, index) {
				console.log(JSON.stringify(item));
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
		  				x
		  			}
		  			</tbody>
	  			</table>
  			</div>
  			);
	}

});

// Export the component back for use in other files
module.exports = Results;