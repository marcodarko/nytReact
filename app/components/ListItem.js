// Include React
var React = require("react");
var CreateReactClass = require('create-react-class');
var axios = require('axios');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Saved = CreateReactClass({

	saveArticle: function(event, articleToSave){

    
    console.log(articleToSave);

  	 axios.put('/save/'+ articleToSave).then((err,saved)=>{
          if (err) console.log(err);
          console.log("saved");
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
  				<button onClick={ (e) => this.saveArticle(e, this.props.title) } className="btn btn-md btn-success themeButtom" type="button">SAVE</button>
  			</td>
  		</tr>

    );
  }

});

// Export the component back for use in other files
module.exports = Saved;