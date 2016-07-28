'use strict';

var models  = require('../models');
var Promise = require('promise');
var randomstring = require("randomstring");
var usersProvider  = require('../modules/users-provider');
var async = require('async');
var usersProv = new usersProvider(); 


var testUtils = {};

testUtils.ensureDestinationCount = function (num, callback){
  var proxyThis = this;
  models.destination.count().then(function(c){
    if(c < num){
      return proxyThis.addTestDestinations(num, callback);
    }
    else{
      return callback(null);
    }
  });
}


testUtils.addTestDestinations = function(num, callback){
  if(!num){
    num = 25;
  }

  console.log('Adding ' + num + ' test destinations')

  getCounties().then(function(countries){
    var destinationCount = 0;
    for(var i=0;i < num; i++){      
      async.waterfall([
        function createOrganization(next){
          var organizationName = "organization - " + randomstring.generate();
          models.organization.create({ name: organizationName}).then(function(organization){
            next(null, countries[Math.floor(Math.random() * countries.length)].id, organization.id);
          })
        },
        function createUser(country_id, organization_id, next){
          var email = randomstring.generate() + "@test.com";
          var username = "john" + randomstring.generate();

          usersProv.create({ username: username,
            email: email,
            password: "secret123"
            }).then(function(user){
              next(null, user.id, country_id, organization_id);
            }).catch(function(err){
              next(err);
            });
        },
        function createAddress(user_id, country_id, organization_id, next){
          models.address.create({
            address_line1: 'testing address1',
            address_line2: 'testing address2',
            city: 'Santa Barbara',
            province: 'California',
            postal_code: '93105',
            country_id: country_id
          }).then(function(address) {
            next(null, user_id, country_id, organization_id, address.id)
          }).catch(function(err){
            next(err);
          }); 
        },
        function createDestination(user_id,country_id, organization_id, address_id, next){
          var destinationName = "destination " + randomstring.generate(2);
          models.destination.create(
          {
              name: destinationName,
              organization_id: organization_id,
              country_id: country_id,
              user_id: user_id,
              address_id: address_id,
              description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, justo sit amet risus etiam porta sem.'
          }).then(function(destination){    
            next(null);
          }).catch(function(err){
            next(err);
          });
        }        
      ],function(error){
        if(error){
          console.log('An error has occurred: ' + error );
          if(callback){
            return callback(error);
          }
        }
        
        if(++destinationCount == num){
          if(callback){
            return callback(null);
          }
        }

      });
    }
  }).catch(function(error){
    console.log('an error has occurred listng the countries ' + error);
    callback(error);
  });
}

function getCounties(){
  return new Promise(function(resolve, reject){
    models.country.findAll({where : { $or: [
        {
          name: {
            $eq: 'United States'
          }
        },{
          name: {
            $eq: 'Australia'
          }
        },{
          name: {
            $eq: 'Bahamas'
          }
        }
      ]}      
    }).then(function(countries){
      resolve(countries);
    }).catch(function(error){
      reject(Error);
    });
  });
}

module.exports = testUtils;