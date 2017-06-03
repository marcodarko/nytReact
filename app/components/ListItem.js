// Include React
var React = require("react");
// var Article = require('./models/article.js');
var AjaxPromise= require('ajax-promise');
var CreateReactClass = require('create-react-class');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Saved = CreateReactClass({

	saveArticle: function(articleToSave){

		AjaxPromise('/save/'+articleToSave).then(saved=>{

			console.log("saved OK");

		});

	},

  // Here we render the function
  render: function() {

    return (
  		<tr>
  			<td>
  				<a href={this.props.url} target="_blank"> {this.props.title} </a>
  			</td>
  			<td>
  				<button onClick={this.saveArticle(this.props.title)} className="btn btn-md btn-success themeButtom" type="button">SAVE</button>
  			</td>
  		</tr>

    );
  }

});

// Export the component back for use in other files
module.exports = Saved;