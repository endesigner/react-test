'use strict';

var React = require('react');

var HotelResult = require('./HotelResult.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {results: []};
  },

  componentDidMount: function() {
    var i = 0;
    this.interval = setInterval(function() {
      // When processing the response of an asynchronous request, be sure to check that the component is still mounted before updating its state by using this.isMounted().
      if (this.isMounted()) {
        var res = this.state.results;
        res.push({id:i++, msg: i});
        this.setState({
          results: res
        });
      }
    }.bind(this), 1);

    setTimeout(function(){
      clearInterval(this.interval);
    }.bind(this), 1000);
  },

  createRow: function(text) {
    return (
      <HotelResult key={text.id} text={text.msg} />
    );
  },

  render: function() {
    return(
      <div>
        {this.state.results.map(this.createRow)}
      </div>
    );
  }
});
