var express = require('express');
var router = express.Router();
var models  = require('../models')
var url = require('url');
var config = require('../config/config.json');

var pageSize = config.destinationsPageSize ? config.destinationsPageSize : 12;

var destinationsProvider = require('../modules/destinations-provider');
var destinationsProv = new destinationsProvider();

models.destination.belongsTo(models.country);

router.use(function getLimitOffset(req, res, next){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  req.paging = {};
  req.paging.offset =  query.offset ? parseInt(query.offset) : 0;
  req.paging.limit =  query.limit ? parseInt(query.limit) : pageSize;

  next();
});

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