var express = require('express');
var router = express.Router();
var models  = require('../../models');

var path = require('path');
var appDir = path.dirname(require.main.filename);

router.get('/admin/', function(req, res, next) {
  res.render('admin/index', {  });
});

module.exports = router;
