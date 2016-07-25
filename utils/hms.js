#!/usr/bin/env node
'use strict';

var testUtils  = require('../modules/test-utils');

console.log(testUtils);

console.log('Node Environment =' + process.env.NODE_ENV)
testUtils.addTestDestinations();


