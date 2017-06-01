// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./app/components/Search");
var Results = require("./app/components/Results");
var Saved = require("./app/components/Saved");

// This is the main component. It includes the banner and button.
// Whenever you click the button it will communicate the click event to all other sub components.
var Main = React.createClass({

  // Here we render the function
  render: function() {

    return (
      <div className="container">
      <Search/>
      <Results/>
      <Saved/>
      </div>

    );
  }

});

// Export the component back for use in other files
module.exports = Main;
