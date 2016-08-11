var express = require('express');
var router = express.Router();

var destinationsProvider = require('../modules/destinations-provider');
var destinationsProv = new destinationsProvider();

router.get('/destination-gallery/:iso_code2/:name', function(req, res, next) {
  destinationsProv.findOneByIsoCode2AndName(req.params.iso_code2, req.params.name).then(function(destination){    
    if(destination){

      res.render('destination-gallery', { destination : destination, scripts : [
          '/assets/js/views/destination-gallery.js?app_version=' + res.app.locals.app_version
          ] 
      });
    }
  });
});

module.exports = router;
