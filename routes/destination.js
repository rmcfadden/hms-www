var express = require('express');
var router = express.Router();
var assets = require('../modules/express-assets');

var destinationsProv = new (require('../modules/destinations-provider'));

router.get('/destination/:iso_code2/:name', 
  assets.scripts(['/assets/js/plugins/imagesloaded.pkgd.js', 
    '/assets/plugins/masonry/jquery.masonry.min.js',
    '/assets/js/plugins/animatedModal.min.js',
    '/assets/js/views/destination.js',
    '/assets/plugins/photoswipe/js/photoswipe.min.js',
    '/assets/plugins/photoswipe/js/photoswipe-ui-default.min.js']),
  assets.stylesheets(['/assets/css/views/destination-gallery.css',
    '/assets/plugins/photoswipe/css/photoswipe.css',
    '/assets/plugins/photoswipe/default-skin/default-skin.css']),  
    function(req, res, next) {
  destinationsProv.findOneByIsoCode2AndName(req.params.iso_code2, req.params.name).then(function(destination){    
    if(destination){
      res.render('destination', { destination : destination});
    }else{
      // TODO: note found
    }
  });
});

module.exports = router;
