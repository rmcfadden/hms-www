var express = require('express');
var router = express.Router();
var models  = require('../models')

router.get('/api/destination-countries', function(req, res, next) {
  
  // TODO:
  models.countries.findAll({
  }).then(function(countries){
    res.setHeader('Content-Type', 'application/json');
    res.json(countries);
    res.end();
  });
});

module.exports = router;