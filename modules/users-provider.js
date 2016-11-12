'use strict';

var models  = require('../models');
var randomstring = require("randomstring");
var bcrypt  = require('bcryptjs');
var Promise = require('promise');

var rolesProv  = new (require('../modules/roles-provider'));

var organizationsProv  = new (require('../modules/organizations-provider'))

var usersProvider  = function(){
  this.create = function(user){
    var proxy = this;
    return new Promise(function(resolve, reject){
      
      if(!user.email) { reject('email field cannot be empty'); return; }
      if(!user.username) { reject('username field cannot be empty'); return; }
      if(!user.password) { reject('password field cannot be empty'); return; }

      var salt =  proxy.generateSalt();
      var hashedPassword = proxy.hashPassword(user.password, salt);

      models.users.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        password_salt: salt
      }).then(function(newUser) {
        return new Promise(function(currentResolve, currentReject){        
          if(user.roles){
            proxy.addRolesToUser(newUser, user.roles).then(function(user){ 
              return currentResolve(user);
            });
          }else{
            return currentResolve(newUser);
          }
        });

      }).then(function(newUser) {
        return new Promise(function(currentResolve, currentReject){        
          if(user.organizations){
            proxy.addOrganizationsToUser(newUser, user.organizations).then(function(user){ 
              return currentResolve(user);
            });
          }else{
            return currentResolve(newUser);
          }
        });
      })
      .then(function(user) {
        resolve(user);
      }).catch(function(err){
        reject(err);
      });
    });
  }

  this.generateSalt = function(){
    return bcrypt.genSaltSync(10);
  }

  this.verifyPassword = function(user, plainTextPassword){
    var hashedPassword = this.hashPassword(plainTextPassword, user.password_salt);
    return (user.password === hashedPassword);
  }

  this.hashPassword = function(password, salt){
    return bcrypt.hashSync(password, salt)
  }

  this.addRolesToUser = function(user, roles){
    return rolesProv.addRolesToUser(user, roles); 
  }

  this.addOrganizationsToUser = function(user, organizations){
    return organizationsProv.addOrganizationsToUser(user, organizations); 
  }

  this.remove = function(user){
    return user.destroy();
  }
}

module.exports = usersProvider;