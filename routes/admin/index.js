var express = require('express');
var router = express.Router();
var models  = require('../../models');

var path = require('path');
var appDir = path.dirname(require.main.filename);
var auth = require('modules/authorization-provider');


router.get('/admin/', 
	auth.demandAdmin({is_admin: true}),
	function(req, res, next) {    
  	res.render('admin/index', { });
	}
);

module.exports = router;
