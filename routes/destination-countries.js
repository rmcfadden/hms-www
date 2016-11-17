var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/api/destination-countries', function(req, res, next) {
  
  // TODO: add to
  models.sequelize.query('select distinct b.* from destinations a inner join countries b on a.country_id=b.id' ,{ type: models.sequelize.QueryTypes.SELECT }).then(function(countries){	

	  res.setHeader('Content-Type', 'application/json');
    res.json(countries);
    res.end();
  
	});
});

module.exports = router;