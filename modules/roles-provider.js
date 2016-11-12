'use strict';

var models  = require('../models');
var async  = require('async');
var Promise = require('promise');


var rolesProvider  = function(){
  this.findAll = function(){
    // TODO: cache this
    return models.roles.findAll();
  }

  this.addRoleToUser = function(user, roleName){
    return this.addRolesToUser(user, [roleName]);
  }  

  this.addRolesToUser = function(user, roles){  
    var proxyThis = this;
    return new Promise(function(resolve, reject){
      proxyThis.findAll().then(function(returnRoles){
        
        // create a lookup table so we don't have O(N^2) runtime
        var rolesLookup = {};
        var rolesMap = {};

        for(var i=0; i < returnRoles.length; i++){
            rolesLookup[returnRoles[i].name] = returnRoles[i].id
            rolesMap[returnRoles[i].id] = returnRoles[i].name;

        }

        // make sure the roles exist
        var mappedRoles = [];
        for(var i=0; i < roles.length; i++){
            if(!rolesLookup[roles[i]]){
              return reject('role ' + roles[i] + ' does not exist');
            }
            else{
              mappedRoles.push({ id: rolesLookup[roles[i]], name: roles[i] });
            }
        }

        user.roles = [];

        var newFunc =  function(role){
          return models.users_roles.create({ user_id: user.id, role_id: role.id });
        }

        Promise.all(mappedRoles.map(newFunc)).then(function(results){
          results.forEach(function(user_role){
            user.roles.push({ name : rolesMap[user_role.role_id], role_id: user_role.role_id, user_id: user.id});
          });

          return resolve(user);
        });

      });
    });
  }
}
module.exports = rolesProvider;