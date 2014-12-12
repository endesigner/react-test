'use strict';

var API = {};
API.call = function(method, data, url) {
  return new Promise(function(resolve, reject) {
    setTimeout(function(){
      resolve({
        statusCode: 201,
        result: method +' '+ data + ' '+ url
      });
    }, 1000);
  });
}

function ShoppingCart(resourceName, apiVersion, apiDomain, ssid, bookerUser) {
  this.RESOURCE_NAME = resourceName;
  this.API_VERSION = apiVersion;
  this.API_DOMAIN = apiDomain;

  this.SSID = ssid;
  this.BOOKER_USER = bookerUser;
}
ShoppingCart.prototype = {
  url: function(){
    return this.API_DOMAIN + '/' + this.API_VERSION + '/' + this.RESOURCE_NAME;
  },

  post: function(data){
    // Expect a Shopping Cart resource in the response body.
    return API.call('POST', data, this.url())
  },

  get: function(){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('get shopping cart');
      }, 1000);
    });
  },

  delete: function(){
  }
};

function Ocean(apiDomain, ssid, bookerUser, sessionId){
  this.config = {};
  this.config.SSID = ssid;
  this.config.BOOKER_USER = bookerUser;
  this.config.SESSIONID = sessionId;
}

Ocean.prototype.getShoppingCart = function() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('get shopping cart');
    }, 1000);
  });
};

Ocean.prototype.createShoppingCart = function() {
  return new Promise(function(resolve, reject){
    
    resolve('create shopping cart');
  });
};

Ocean.prototype.getBookingItem = function(){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('hello world');
    }, 1000);
  });
};

Ocean.prototype.search = function(params) {
  var self = this;

  this.getShoppingCart()
  .then(function(shoppingCart){
    console.log(shoppingCart);
    return self.getBookingItem();
  })
  .then(function(bookingItem){
    console.log(bookingItem);
  });

  //this.getBookingItem().then(function(val){
    //console.log(val);
  //});
  //console.log(params);
  //console.log(this.config);
};


