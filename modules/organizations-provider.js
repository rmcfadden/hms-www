'use strict';

var models  = require('../models');
var Promise = require('promise');
var async  = require('async');

var organizationsProvider  = function(){
  this.findAll = function(){
    // TODO: cache this
    return models.organizations.findAll();
  }

  this.addOrganizationToUser = function(user, organizationName){
    return this.addOrganizationsToUser(user, [organizationName]);
  }  

  this.addOrganizationsToUser = function(user, organizations){  
    var proxyThis = this;
    return new Promise(function(resolve, reject){
      models.organizations.findAll( { where : { name : { $in :organizations }}}).then(function(returnOrganizations){        
 
        // create a lookup table so we don't have O(N^2) runtime
        var organizationsLookup = {};
        var organizationsMap = {};

        for(var i=0; i < returnOrganizations.length; i++){
            organizationsLookup[returnOrganizations[i].name] = returnOrganizations[i].id;
            organizationsMap[returnOrganizations[i].id] = returnOrganizations[i].name;
        }

        // make sure the organizations exist
        var mappedOrganizations = [];
        for(var i=0; i < organizations.length; i++){
            if(!organizationsLookup[organizations[i]]){
              return reject('organization ' + organizations[i] + ' does not exist');
            }
            else{
              mappedOrganizations.push({ id: organizationsLookup[organizations[i]], name: organizations[i] });
            }
        }

        user.organizations = [];

        var newFunc =  function(organization){
          return models.users_organizations.create({ user_id: user.id, organization_id: organization.id });
        }

        Promise.all(mappedOrganizations.map(newFunc)).then(function(results){
          results.forEach(function(user_organization){
            user.organizations.push({ name : organizationsMap[user_organization.organization_id], organization_id: user_organization.organization_id, user_id: user.id});
          });

          return resolve(user);
        }).catch(function(err){
          return reject(err);
        });

      });
    });
  }
}

module.exports = organizationsProvider;