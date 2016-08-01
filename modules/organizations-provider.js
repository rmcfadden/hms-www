'use strict';

var models  = require('../models');
var Promise = require('promise');
var async  = require('async');

var organizationsProvider  = function(){
  this.findAll = function(){
    // TODO: cache this
    return models.organization.findAll();
  }

  this.addOrganizationToUser = function(user, organizationName){
    return this.addOrganizationsToUser(user, [organizationName]);
  }  

  this.addOrganizationsToUser = function(user, organizations){  
    var proxyThis = this;
    return new Promise(function(resolve, reject){
      models.organization.findAll( { where : { name : { $in :organizations }}}).then(function(returnOrganizations){        
 
        // create a lookup table so we don't have O(N^2) runtime
        var organizationsLookup = {}
        for(var i=0; i < returnOrganizations.length; i++)
        {
            organizationsLookup[returnOrganizations[i].name] = returnOrganizations[i].id
        }

        // make sure the organizations exist
        var mappedOrganizations = [];
        for(var i=0; i < organizations.length; i++)
        {
            if(!organizationsLookup[organizations[i]]){
              return reject('organization ' + organizations[i] + ' does not exist');
            }
            else
            {
              mappedOrganizations.push({ id: organizationsLookup[organizations[i]], name: organizations[i] });
            }
        }

        user.organizations = [];

        async.forEach(mappedOrganizations, function (organization, callback){ 
          models.users_organizations.create({ user_id: user.id, organization_id: organization.id }).then(function(user_organization){            
            user.organizations.push({ name : organization.name, organization_id: user_organization.id, user_id: user.id});
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

module.exports = organizationsProvider;