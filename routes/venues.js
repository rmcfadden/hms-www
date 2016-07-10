var express = require('express');
var router = express.Router();
var models  = require('../models')

router.get('/venues', function(req, res, next) {
  
  models.venue.findAll({
  }).then(function(venues){
    res.render('venues', { title: 'Express', venues : venues });
  });
});

module.exports = router;