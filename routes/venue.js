var express = require('express');
var router = express.Router();

router.get('/venue', function(req, res, next) {
  res.render('venue', { title: 'Express' });
});

module.exports = router;
