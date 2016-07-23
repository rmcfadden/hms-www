'use strict';

var models  = require('../models');
var randomstring = require("randomstring");
var Promise = require('promise');
var crypto = require('crypto');
var sequelize = require('sequelize');
var moment = require('moment');

var sessionsProvider  = function(){
 this.create = function(user){
    var proxy = this;
    return new Promise(function(resolve, reject){
      
      if(!user.id) { reject('id field cannot be empty'); return; }

      var token = proxy.generateToken();

      var sessionHours = 24;

      models.session.create({
        user_id: user.id,
        token : token,
        start:  moment(),
        end:  moment().add(24, 'hours')
      }).then(function(session) {
        resolve(session);
      }).catch(function(err){
        reject(err);
      });
    });
 }
 
this.generateToken = function() {
  var sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
}

};

module.exports = sessionsProvider;