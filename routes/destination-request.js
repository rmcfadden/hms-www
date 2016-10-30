var express = require('express');
var router = express.Router();
var assets = require('../modules/express-assets');


var destinationsProvider = require('../modules/destinations-provider');
var destinationsProv = new destinationsProvider();

router.get('/destination-request/:iso_code2/:name', 

  assets.scripts(['/assets/js/views/destination-request.js'] ), 
  assets.stylesheets([
    '/assets/plugins/line-icons/line-icons.css',
    '/assets/plugins/sky-forms-pro/sky-forms/css/sky-forms.css',
    '/assets/plugins/sky-forms-pro/sky-forms/custom/custom-sky-forms.css',
    '/assets/css/views/destination-request.css'] ), 
  function(req, res, next) {
    destinationsProv.findOneByIsoCode2AndName(req.params.iso_code2, req.params.name).then(function(destination){    
      if(destination){
        res.render('destination-request', { destination : destination});
      }
    });
  }
);

module.exports = router;
