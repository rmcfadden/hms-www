var express = require('express');
var router = express.Router();
var models  = require('../models');


/* GET home page. */
router.get('/', function(req, res, next) {

  models.destinations.findAndCountAll({ include: [models.countries], offset: 0, limit: 4}).then(function(destinations){
    res.render('index', { destinations : destinations.rows });
  });
});

module.exports = router;
