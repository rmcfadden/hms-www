'use strict'

require('rootpath')();

var express = require('express');
var router = express.Router();
var assets = require('modules/express-assets');

var destinationsProv = new (require('modules/destinations-provider'));

router.get('/admin/destination/:iso_code2/:name', 
  assets.scripts(['/assets/admin/js/views/destination.js'
  	]), 
  assets.stylesheets([,
    ]),  
    function(req, res, next) {
  destinationsProv.findOneByIsoCode2AndName(req.params.iso_code2, req.params.name).then(function(destination){    
    if(destination){
      res.render('admin/destination', { destination : destination});
    }else{
      // TODO: not found
    }
  });
});

module.exports = router;
