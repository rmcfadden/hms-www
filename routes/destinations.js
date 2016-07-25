var express = require('express');
var router = express.Router();
var models  = require('../models')
var url = require('url');

var defaultLimit = 12;


router.use(function getLimitOffset(req, res, next){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  req.paging = {};
  req.paging.offset =  query.offset ? parseInt(query.offset) : 0;
  req.paging.limit =  query.limit ? parseInt(query.limit) : defaultLimit;

  next();
});

router.get('/destinations', function(req, res, next) {  
  models.destination.findAndCountAll({ offset: req.paging.offset, limit: req.paging.limit}).then(function(destinations){
    res.render('destinations', { destinations : destinations.rows });
  });
});


router.get('/api/destinations', function(req, res, next) {
  models.destination.findAndCountAll({ offset: req.paging.offset, limit: req.paging.limit}).then(function(destinations){
    res.setHeader('Content-Type', 'application/json');
    res.json(destinations);
    res.end();
  });
});


function sequelizePager()
{
}


module.exports = router;