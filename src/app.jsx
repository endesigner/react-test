var React = require('react');

var ResultList = require('./ResultList.jsx');
var HotelResult = require('./HotelResult.jsx');

React.render(
  <div>
  <h1><HotelResult text="HotelResult" /></h1>
  <ResultList />
  </div>,
  document.getElementById('root')
);
