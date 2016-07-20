var express = require('express');
var router = express.Router();
var models  = require('../models')

router.get('/api/countries', function(req, res, next) {
  
  models.country.findAll({
  }).then(function(countries){
    res.setHeader('Content-Type', 'application/json');
    res.json(countries);
    res.end();
  });
});

module.exports = router;