var express = require('express');
var router = express.Router();
var models  = require('../models')

router.get('/api/destination_countries', function(req, res, next) {
  
  // TODO:
  models.country.findAll({
  }).then(function(countries){
    res.setHeader('Content-Type', 'application/json');
    res.json(countries);
    res.end();
  });
});

module.exports = router;