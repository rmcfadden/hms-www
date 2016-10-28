var express = require('express');
var router = express.Router();
var models  = require('../models')
var assets = require('../modules/express-assets');

var galleriesProv = new (require('../modules/galleries-provider'));


router.get('/galleries/', 
  assets.scripts(['/assets/js/plugins/freewall.js',
    '/assets/js/views/galleries.js',]),
  assets.stylesheets(['/assets/css/views/galleries.css']), 
  function(req, res, next) {  
    galleriesProv.findAll({ paging : req.paging}).then(function(galleries){
    res.render('galleries', { galleries : galleries.rows });
  });
});


router.get('/api/galleries/', function(req, res, next) {  
  galleriesProv.findAll({ paging : req.paging}).then(function(galleries){
    res.setHeader('Content-Type', 'application/json');
    res.json(galleries); 
    res.end();
  });
});

module.exports = router;
