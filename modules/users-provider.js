'use strict';

var models  = require('../models');
var randomstring = require("randomstring");
var bcrypt  = require('bcrypt');
var Promise = require('promise');

var usersProvider  = function(){
  this.create = function(user){
    var proxy = this;
    return new Promise(function(resolve, reject){
      
      if(!user.email) { reject('email field cannot be empty'); return; }
      if(!user.username) { reject('username field cannot be empty'); return; }
      if(!user.password) { reject('password field cannot be empty'); return; }


      var salt =  proxy.generateSalt();
      var hashedPassword = proxy.hashPassword(user.password, salt);

      models.user.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        password_salt: salt
      }).then(function(user) {
        resolve(user);
      }).catch(function(err){
        reject(err);
      });
    });
  }

  this.generateSalt = function(){
    return bcrypt.genSaltSync(10);
  }

  this.hashPassword = function(password, salt){
    return bcrypt.hashSync(password, salt)
  }
}

module.exports = usersProvider;