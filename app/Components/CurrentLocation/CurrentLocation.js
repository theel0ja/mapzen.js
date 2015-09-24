var React = require('react');
var ReactSpinner = require('../Spin');
require('ratchet');
var store = require('../../reducer')
require('../css/main.scss');


//action

function updateCurrentLocationAction(pos) {
  console.log(pos);
  return {
    type: 'updateCurrentPoint',
    currentPoint: {
      name : "Current location",
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
  }
}

//action

function updateStartLocationAction(pos) {
  console.log(pos);
  return {
    type: 'updateStartPoint',
    startPoint: {
      name : "Current location",
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
  }
}


var CurrentLocation = React.createClass({
  getInitialState: function(){
    return{
      //spin js options
      config : {
        lines: 9 // The number of lines to draw
        , length: 0 // The length of each line
        , width: 6 // The line thickness
        , radius: 8 // The radius of the inner circle
        , color: '#27AAE1' // #rgb or #rrggbb or array of colors
        , speed: 1 // Rounds per second
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '55%' // Top position relative to parent
        , left: '55%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: true // Whether to use hardware acceleration
      },
      spinning: false
    }
  },
  getCurrentLocation: function(){
    this.mountSpinner();
    var self = this;
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          store.dispatch(updateCurrentLocationAction(position));
          store.dispatch(updateStartLocationAction(position));
          self.props.setCurrentLocation(position);
          self.unmountSpinner();
        });
    } else {
        //what will it show when browser doesn't support geolocation?
    }
  },
  mountSpinner: function(){
    React.render(<ReactSpinner config={this.state.config}/>, document.getElementById('spinnerSpot'));
    this.setState({
      spinning:true
    });
  },
  unmountSpinner: function(){
    React.unmountComponentAtNode(document.getElementById('spinnerSpot'));
    this.setState({
      spinning:false
    })
  },
  render : function(){
    return(
      <div className="currentLocation side">
        <div className={(this.state.spinning === false)? "icon-current-location" : "icon-hexagon"} onClick= {this.getCurrentLocation}></div>
        <div id="spinnerSpot"></div>
      </div>
    );
  }
});

module.exports = CurrentLocation;

