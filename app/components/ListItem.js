// Include React
var React = require("react");
var Article = require('./models/article.js');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Saved = React.createClass({

	saveArticle: function(articleToSave){

		Article.update({title: articleToSave}, $set:{saved: true}, function(err, updated){
			if(err){
				console.log(err);
			}
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
  				<button onClick={this.props.saveArticle({this.props.title})} className="btn btn-md btn-success" type="button">SAVE</button>
  			</td>
  		</tr>

    );
  }

});

// Export the component back for use in other files
module.exports = Saved;