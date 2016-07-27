var express = require('express');
var router = express.Router();
var models  = require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {

  models.destination.findAndCountAll({ include: [models.country], offset: 0, limit: 3}).then(function(destinations){
    res.render('index', { destinations : destinations.rows });
  });
});

module.exports = router;
