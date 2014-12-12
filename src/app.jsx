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

      <RouteHandler />
      </div>
    );
  }
});

var Search = React.createClass({
  getInitialState: function() {
    return {
      showSearchResults: false,
      data: [
        { hotelName: 'a', latitude: '1.9', longitude: '2.0' },
        { hotelName: 'b', latitude: '1.9', longitude: '2.0' },
        { hotelName: 'c', latitude: '1.9', longitude: '2.0' }
      ]
    };
  },

  handleSearch: function(searchParams) {
    var d = this.state.data;
    var nd = d.concat([{ hotelName: 'c', latitude: '1.9', longitude: '2.0' }]);
    this.setState({
      showSearchResults: true,
      searchParams: searchParams,
      data: nd
    });

    // Get search results
    var o = new Ocean('123', 'booker_user', 'session_id');
    o.search(this.state.searchParams);
  },

  render: function() {
    return (
      <div>
        <SearchForm handleSearch={this.handleSearch} />
        <SearchResults show={this.state.showSearchResults} searchParams={this.state.searchParams} results={this.state.data} />
      </div>
    );
  }
});

var SearchForm = React.createClass({
  handleSubmit: function() {
    var label = this.refs.searchDestination.getDOMNode().value;
    var checkIn = this.refs.searchCheckinDate.getDOMNode().value;
    var checkOut = this.refs.searchCheckoutDate.getDOMNode().value;

    var d = {
      label: label,
      checkIn: checkIn,
      checkOut: checkOut
    };
    this.props.handleSearch(d);
  },

  render: function() {
    return (
      <div>
        <label htmlFor="search-destination">Search destination</label>
        <input id="search-destination" ref="searchDestination" />
        <label htmlFor="search-checkindate">Check-in date</label>
        <input id="search-checkindate" ref="searchCheckinDate" />
        <label htmlFor="search-checkoutdate">Check-out date</label>

        <input id="search-checkoutdate" ref="searchCheckoutDate" />
        <button id="submit-button" onClick={this.handleSubmit}>Search</button>
      </div>
    );
  }
});
var SearchResults = React.createClass({
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    results: React.PropTypes.array.isRequired,
    searchParams: React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      checkIn: React.PropTypes.string.isRequired,
      checkOut: React.PropTypes.string.isRequired
    })
  },

  render: function() {
    var r = <div></div>;

    if (this.props.show) {
      r = (
        <div>
          { this.props.searchParams.label + ' ' + this.props.searchParams.checkIn + ' ' + this.props.searchParams.checkOut }

          { this.props.results.map(function(row){
              return (
                <div>{row}</div>
                );
          }) }
        </div>
      );
    }

    return r;
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
