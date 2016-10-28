var express = require('express');
var router = express.Router();
var models  = require('../models')
var assets = require('../modules/express-assets');

var galleriesProv = new (require('../modules/galleries-provider'));


router.get('/gallery/:name', 
  assets.scripts(['/assets/js/plugins/freewall.js',
    '/assets/js/views/gallery.js',
    '/assets/js/views/media-gallery.js',
    '/assets/plugins/photoswipe/js/photoswipe.min.js',
    '/assets/plugins/photoswipe/js/photoswipe-ui-default.min.js']),
  assets.stylesheets(['/assets/css/views/gallery.css',
    '/assets/plugins/photoswipe/css/photoswipe.css',
    '/assets/plugins/photoswipe/default-skin/default-skin.css',
    '/assets/css/views/gallery.css']),
  function(req, res, next) {  
    galleriesProv.findByName(req.params.name).then(function(gallery){  
      if(gallery){
        res.render('gallery', { gallery : gallery});
      }else{
      // TODO: not found
      }
   });
});


router.get('/api/gallery/:name', function(req, res, next) {  
  galleriesProv.findByName({ paging : req.paging}).then(function(galleries){
    res.setHeader('Content-Type', 'application/json');
    res.json(galleries); 
    res.end();
  });
});

module.exports = router;
