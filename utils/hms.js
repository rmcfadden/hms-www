#!/usr/bin/env node
'use strict';

var testUtils  = require('../modules/test-utils');


console.log('Node Environment =' + process.env.NODE_ENV)

testUtils.addTestDestinations(10, function(error){
  process.exit();
});


