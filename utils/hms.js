#!/usr/bin/env node
'use strict';

var program = require('commander');

console.log('Node Environment =' + process.env.NODE_ENV);

program
  .command('add-user')
  .option('-u, --username', 'Username [required]')
  .option('-e, --email', 'Email [required]')
  .option('-p, --password', 'Password [required]')
  .option('-r, --roles', 'Roles')
  .option('-o, --organizations', 'Organizations')
  .action(function() {
    var usersProvider  = require('../modules/users-provider');
    var usersProv = new usersProvider();    
    
    console.log(program);

    if (!cmd.username){
      argumentError('username');
    }

    if (!program.email){
      argumentError('email');
    }

    if (!program.password){
      argumentError('password');
    }

    var user = {
      username: program.username,
      email: program.email,
      password: program.password,
    }

    usersProv.create(user, function(newUser){
      process.exit();
    });
   });

program
  .command('add-test-data')  
  .action(function(cmd) {
    var testUtils  = require('../modules/test-utils');
    testUtils.addTestDestinations(10, function(error){
      process.exit();
    });
   });

program.parse(process.argv);

function argumentError(argName){
  console.log();
  console.log('ERROR: --' + argName + ' required!!');
  program.help();
  process.exit();
}


 
