'use strict';

var models  = require('../models');
var randomstring = require("randomstring");
var Promise = require('promise');
var crypto = require('crypto');
var sequelize = require('sequelize');
var moment = require('moment');

var sessionsProvider  = function(){
  var sessionHours = 24 * 30;  // TODO: move to config
  
  this.create = function(user){
    var proxy = this;
    return new Promise(function(resolve, reject){
      
      if(!user.id) { reject('id field cannot be empty'); return; }

      var token = proxy.generateToken();

      models.sessions.create({
        user_id: user.id,
        token : token,
        start:  moment(),
        end:  moment().add(sessionHours, 'hours'),
        last_activity_date:  moment()
      }).then(function(session) {
        resolve(session);
      }).catch(function(err){
        reject(err);
      });
    });
  }

  this.findByToken = function(token){
    return models.sessions.findOne({ where : { token : token, $or: {"is_expired": "false"}}});
  }

  this.isExpired = function(session){
    if(session.is_expired === true){
      return true;
    }

    if(moment().isAfter(moment(session.end))) {
      return true;
    }

    return false;
  };


  this.refresh = function(token){
   return models.sessions.update({ last_activity_date: moment(), end: moment().add(sessionHours, 'hours') }, {where : {token :token }});
  };


  this.expire = function(token){
   return models.sessions.update({ is_expired: true }, {where : {token :token }});
  };
 
  this.generateToken = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
  }
};

module.exports = sessionsProvider;