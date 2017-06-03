// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("../components/Search");
// var Results = require("../components/Results");
// var Saved = require("../components/Saved");
var CreateReactClass = require('create-react-class');

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Main = CreateReactClass({

  // Here we render the function
  render: function() {

    return (
      <div className="container">
        <Search/>
      </div>

    );
  }

});

// Export the component back for use in other files
module.exports = Main;
