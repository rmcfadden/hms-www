var express = require('express');
var router = express.Router();

var destinationsProvider = require('../modules/destinations-provider');
var destinationsProv = new destinationsProvider();

router.get('/destination/:iso_code2/:name', function(req, res, next) {
  destinationsProv.findOneByIsoCode2AndName(req.params.iso_code2, req.params.name).then(function(destination){    
    if(destination){

      console.log(destination.destionation_reviews);

/*
      // testin reviews:
      destination.destination_reviews = [ {title: 'Awesome destination!!!', text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble."},{title: 'We loved it!!!', text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble."}] ;*/

      res.render('destination', { destination : destination, scripts : [
          '/assets/js/views/destination.js?app_version=' + res.app.locals.app_version,
          '/assets/js/plugins/gmap.min.js?app_version=' + res.app.locals.app_version,
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyA9WxXXYFQ1M7X798jOcqKM79JMUrvuN5I&callback=initGoogleDestinationMap'
          ] 
      });
    }
  });
});

module.exports = router;
