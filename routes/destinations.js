'use strict';


require('rootpath')();

var express = require('express');
var router = express.Router();
var models  = require('models')

var destinationsProv = new (require('modules/destinations-provider'));


router.get('/destinations/', function(req, res, next) {  
  destinationsProv.findAll({ paging : req.paging}).then(function(destinations){
    res.render('destinations', { destinations : destinations.rows });
  });
});


router.get('/api/destinations/', function(req, res, next) {  
  destinationsProv.findAll({ paging : req.paging}).then(function(destinations){
    res.setHeader('Content-Type', 'application/json');
    res.json(destinations); 
    res.end();
  });
});


router.get('/destinations/country/:iso_code2', function(req, res, next) {  
  destinationsProv.findAllByIsoCode2(req.params.iso_code2, {  paging : req.paging}).then(function(destinations){
    res.render('destinations', { destinations : destinations.rows });
  });
});


router.get('/api/destinations/country/:iso_code2', function(req, res, next) {
  destinationsProv.findAllByIsoCode2(req.params.iso_code2, {  paging : req.paging}).then(function(destinations){
    res.setHeader('Content-Type', 'application/json');
    res.json(destinations); 
    res.end();
  });
});

router.get('/api/destinations/category/:category_name', function(req, res, next) {
  destinationsProv.findAllByDestinationCategory(req.params.category_name, {paging : req.paging}).then(function(destinations){
    res.setHeader('Content-Type', 'application/json');
    res.json(destinations);
    res.end();
  });
});


router.get('/destinations/category/:category_name', function(req, res, next) {
  destinationsProv.findAllByDestinationCategory(req.params.category_name, {paging : req.paging}).then(function(destinations){
    res.render('destinations', { destinations : destinations.rows });
  });
});


module.exports = router;