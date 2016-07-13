var express = require('express');
var router = express.Router();

router.get('/destination', function(req, res, next) {
  res.render('destination', { title: 'Express' });
});

module.exports = router;
