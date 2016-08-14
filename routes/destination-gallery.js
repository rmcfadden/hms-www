var express = require('express');
var router = express.Router();
var assets = require('../modules/express-assets');


var destinationsProvider = require('../modules/destinations-provider');
var destinationsProv = new destinationsProvider();

router.get('/destination-gallery/:iso_code2/:name', 

  assets.scripts(['/assets/js/plugins/imagesloaded.pkgd.js', 
    '/assets/plugins/masonry/jquery.masonry.min.js',
    '/assets/js/views/destination-gallery.js'] ), 
  assets.stylesheets(['/assets/css/views/destination-gallery.css'] ), 

  function(req, res, next) {
    destinationsProv.findOneByIsoCode2AndName(req.params.iso_code2, req.params.name).then(function(destination){    
      if(destination){
        res.render('destination-gallery', { destination : destination});
      }
    });
  }
);

module.exports = router;
