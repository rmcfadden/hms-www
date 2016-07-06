var express = require('express');
var router = express.Router();

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

module.exports = router;
