var express = require('express');
var router = express.Router();

router.get('/destination/:iso_code2/:name', function(req, res, next) {
  res.render('destination', { title: 'Express' });
});

module.exports = router;
