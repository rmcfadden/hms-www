var express = require('express');
var router = express.Router();
var models  = require('../models')

router.get('/destinations', function(req, res, next) {
  
  models.destination.findAll({
  }).then(function(destinations){
    res.render('destinations', { title: 'Express', destinations : destinations });
  });
});

module.exports = router;