var express = require('express');
var router = express.Router();

var destinationsProvider = require('../modules/destinations-provider');
var destinationsProv = new destinationsProvider();

router.get('/destination/:iso_code2/:name', function(req, res, next) {
  destinationsProv.findOneByIsoCode2AndName(req.params.iso_code2, req.params.name).then(function(destination){    
    if(destination){
      res.render('destination', { destination : destination, scripts : [
          '//maps.google.com/maps/api/js',
          '/assets/js/plugins/gmap.min.js?app_version=' + res.app.locals.app_version,
          '/assets/js/plugins/gmap.min.js?app_version=' + res.app.locals.app_version,
          '/assets/js/views/destination.js?app_version=' + res.app.locals.app_version,
          ] });
    }
  });
});

module.exports = router;
