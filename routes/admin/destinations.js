'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();

var destinationsProv = new (require('modules/destinations-provider'));


router.get('/admin/destinations/', function(req, res, next) {  

  console.log('ME!!');
  console.log(req.me);

  destinationsProv.findAll({ paging : req.paging}).then(function(destinations){
    res.render('admin/destinations', { destinations : addIsAdminProperty(destinations) });

  });
});


router.get('/admin/destinations/country/:iso_code2', function(req, res, next) {  
  destinationsProv.findAllByIsoCode2(req.params.iso_code2, {  paging : req.paging}).then(function(destinations){
    res.render('admin/destinations', { destinations : addIsAdminProperty(destinations) });
  });
});


router.get('/admin/destinations/category/:category_name', function(req, res, next) {
  destinationsProv.findAllByDestinationCategory(req.params.category_name, {paging : req.paging}).then(function(destinations){
    res.render('admin/destinations', { destinations : addIsAdminProperty(destinations) });
  });
});


function addIsAdminProperty(destinations){
  if(!destinations.rows){
    return destinations;
  }

  destinations.rows.forEach(function(destination){
    destination.is_admin = true;
  });

  return destinations;

}


module.exports = router;