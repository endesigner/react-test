'use strict';

var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

var ResultList = require('./ResultList.jsx');
var HotelResult = require('./HotelResult.jsx');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <ul>
          <li><Link to='home'>Home</Link></li>
          <li><Link to='search'>Search</Link></li>
          <li><Link to='whatever'>Whatever</Link></li>
        </ul>

      <RouteHandler/>
      </div>
    );
  }

});

var Search = React.createClass({
  getInitialState: function() {
    return {showSearchResults: false};

  },

  handleSearchButton: function(event) {
    this.setState({
      label:this.refs.searchDestination.getDOMNode().value,
      checkIn:this.refs.searchCheckinDate.getDOMNode().value,
      checkOut:this.refs.searchCheckoutDate.getDOMNode().value,
      showSearchResults: true
    });
  },

  render: function() {
    return(
      <div>
        <label for="search-destination">Search destination</label>
        <input id="search-destination" ref="searchDestination" />
        <label for="search-checkindate">Check-in date</label>
        <input id="search-checkindate" ref="searchCheckinDate" />
        <label for="search-checkoutdate">Check-out date</label>
        <input id="search-checkoutdate" ref="searchCheckoutDate" />
        <button id="submit-button" onClick={this.handleSearchButton}>Search</button>

        {this.state.showSearchResults ? <SearchResult/> : null }
      </div>
    );
  }
});

var SearchResult = React.createClass({
  render: function() {
    return (
      <div>
        SearchResult
      </div>
    );
  }
});

var routes = (
  <Route name='home' path='/' handler={App}>
    <Route name='search' path='/search' handler={Search}/>
    <Route name='whatever' path='/whatever' handler={ResultList}/>
  </Route>
);

Router.run(routes, function( Handler ) {
  React.render(
    <div>
      <Handler />
    </div>
  , document.body);
});
