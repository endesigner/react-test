'use strict';
describe('ShoppingCart', function(){
  var instance;
  var RESOURCE_NAME = 'shopping_carts';
  var API_VERSION = 'v1';
  var API_DOMAIN = 'https://api-domain';
  var SSID = 'ssid';
  var BOOKER_USER = {};

  beforeEach(function(){
    instance = new ShoppingCart(RESOURCE_NAME, API_VERSION, API_DOMAIN, SSID, BOOKER_USER);
  });

  afterEach(function(){
    instance = null;
  });

  it('should return api url', function(){
    expect(instance.API_DOMAIN + '/' + instance.API_VERSION + '/' + instance.RESOURCE_NAME)
    .toBe(API_DOMAIN + '/' + API_VERSION + '/' + RESOURCE_NAME);
  });

  it('should be instantiated with arguments', function(){
    var expected = {
      RESOURCE_NAME: RESOURCE_NAME,
      API_VERSION: API_VERSION,
      API_DOMAIN: API_DOMAIN,
      SSID: SSID,
      BOOKER_USER: {}
    };
    expect(JSON.stringify(instance))
    .toEqual(JSON.stringify(expected));
  });

  it('should create a shopping cart', function(done){
    instance.post('hh')
    .then(function(result){
      console.log(result);
      done();
    });
  });

  it('should get cart data', function(done){
    instance.get().then(function(json){
      console.log(json);
      done();
    });
  });
});
