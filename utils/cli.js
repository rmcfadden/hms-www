#!/usr/bin/env node
'use strict';

var program = require('commander');
var colors = require('colors');

if(!process.env.NODE_ENV){
  process.env.NODE_ENV = 'development';
}

console.log('Node Environment =' + process.env.NODE_ENV);

program
  .command('add-user')
  .option('-u, --username <username>', 'Username [required]')
  .option('-e, --email <email>', 'Email [required]')
  .option('-p, --password <password>', 'Password [required]')
  .option('-r, --roles <roles>', 'Roles')
  .option('-o, --organizations <organizations>', 'Organizations')
  .action(function(cmd) {
    var usersProvider  = require('../modules/users-provider');
    var usersProv = new usersProvider();    
    
    if (!cmd.username){
      argumentError('username');
    }

    if (!cmd.email){
      argumentError('email');
    }

    if (!cmd.password){
      argumentError('password');
    }

    var user = {
      username: cmd.username,
      email: cmd.email,
      password: cmd.password,
    }

    if (cmd.roles){
      user.roles = cmd.roles.split(",");
    }

    if (cmd.organizations){
      user.organizations = cmd.organizations.split(",");
    }

    usersProv.create(user).then(function(newUser){
      console.log('Successfully added username with id: ' + newUser.id);
      process.exit();
    }).catch(function(err){
      console.log('Error adding user: ' + err);
      process.exit();
    });
   });

program
  .command('add-test-data')  
  .action(function(cmd) {
    var testUtils  = require('../modules/test-utils');
    testUtils.addTestDestinations(10, null, function(error){
      process.exit();
    });
   });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}


function argumentError(argName){
  console.log();
  console.log('ERROR: --' + argName + ' required!!');
  program.help();
  process.exit();
}


 
