'use strict'

require('rootpath')();


var express = require('express');
var router = express.Router();
var models  = require('models');

var usersProv  = new (require('modules/users-provider'));
var sessionsProv  = new (require('modules/sessions-provider'));

router.get('/admin/login', function(req, res, next) {
  res.render('admin/login');
});

module.exports = router;
