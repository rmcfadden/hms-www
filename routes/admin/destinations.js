'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();

var destinationsProv = new (require('modules/destinations-provider'));


router.get('/admin/destinations/', function(req, res, next) {  
  destinationsProv.findAll({ paging : req.paging}).then(function(destinations){
    res.render('admin/destinations', { destinations : destinations.rows });
  });
});


router.get('/admin/destinations/country/:iso_code2', function(req, res, next) {  
  destinationsProv.findAllByIsoCode2(req.params.iso_code2, {  paging : req.paging}).then(function(destinations){
    res.render('admin/destinations', { destinations : destinations.rows });
  });
});


router.get('/admin/destinations/category/:category_name', function(req, res, next) {
  destinationsProv.findAllByDestinationCategory(req.params.category_name, {paging : req.paging}).then(function(destinations){
    res.render('admin/destinations', { destinations : destinations.rows });
  });
});


module.exports = router;