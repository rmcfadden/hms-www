'use strict';

var models  = require('../models');
var async  = require('async');
var Promise = require('promise');


var rolesProvider  = function(){
  this.findAll = function(){
    // TODO: cache this
    return models.role.findAll();
  }

  this.addRoleToUser = function(user, roleName){
    return this.addRolesToUser(user, [roleName]);
  }  

  this.addRolesToUser = function(user, roles){  
    var proxyThis = this;
    return new Promise(function(resolve, reject){
      proxyThis.findAll().then(function(returnRoles){
        
        // create a lookup table so we don't have O(N^2) runtime
        var rolesLookup = {}
        for(var i=0; i < returnRoles.length; i++)
        {
            rolesLookup[returnRoles[i].name] = returnRoles[i].id
        }

        // make sure the roles exist
        var mappedRoles = [];
        for(var i=0; i < roles.length; i++)
        {
            if(!rolesLookup[roles[i]]){
              return reject('role ' + roles[i] + ' does not exist');
            }
            else
            {
              mappedRoles.push({ id: rolesLookup[roles[i]], name: roles[i] });
            }
        }

        user.roles = [];

        async.forEach(mappedRoles, function (role, callback){ 
          models.users_roles.create({ user_id: user.id, role_id: role.id }).then(function(user_role){            
            user.roles.push({ name : role.name, role_id: role.id, user_id: user.id});
            callback();
          }).catch(function(error){
              return callback(error);
          });
        }, function(err) {
          if(err){
            return reject(err);
          }
          else{
            return resolve(user);
          }
        }); 

      }).catch(function(error){
        return reject(error);
      });

    });
  }
}

module.exports = rolesProvider;