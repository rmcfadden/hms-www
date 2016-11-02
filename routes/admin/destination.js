'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();

var destinationsProv = new (require('modules/destinations-provider'));

module.exports = router;