'use strict';

module.exports = function(app){
  app.locals.truncateWithEllipses = function (txt, n){
    return (txt.length > n) ? txt.substr(0,n-1)+'...' : txt;
  };

  app.locals.createDestinationLink = function (destination){
    var adminPrefix = '';
    if(destination.is_admin && destination.is_admin === true){
    	adminPrefix = '/admin';
    }

    return adminPrefix + '/destination/' + destination.country.iso_code2.toLowerCase() + '/' +  encodeURI(destination.name.toLowerCase()) + '/';
  };

   app.locals.createDestinationRequestLink = function (destination){
    return '/destination-request/' + destination.country.iso_code2.toLowerCase() + '/' +  encodeURI(destination.name.toLowerCase()) + '/';
  };


/*
  app.locals.isLoggedIn = function()
  {
  	return (typeof res.locals.me !== 'undefined' );
  }
  */
}