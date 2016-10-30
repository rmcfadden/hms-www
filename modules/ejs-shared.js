'use strict';
module.exports = function(app){
  app.locals.truncateWithEllipses = function (txt, n){
    return (txt.length > n) ? txt.substr(0,n-1)+'...' : txt;
  };

  app.locals.createDestinationLink = function (destination){
    return '/destination/' + destination.country.iso_code2.toLowerCase() + '/' +  encodeURI(destination.name.toLowerCase()) + '/';
  };

   app.locals.createDestinationRequestLink = function (destination){
    return '/destination-request/' + destination.country.iso_code2.toLowerCase() + '/' +  encodeURI(destination.name.toLowerCase()) + '/';
  };
}