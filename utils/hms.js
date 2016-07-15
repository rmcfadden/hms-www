#!/usr/bin/env node

'use strict';

var models  = require('../models');
var Promise = require('promise');
var randomstring = require("randomstring");

var async = require('async');
addTestDestinations();

console.log('Node Environment =' + process.env.NODE_ENV)


function addTestDestinations(num){
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

          models.user.create({ username: username,
            email: email,
            password: "secret",
            password_salt : "213"
            }).then(function(user){
            next(null, user.id, country_id, organization_id);
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
              description: 'bla, bla'
          }).then(function(destination){            
            next()
          });
        }        
      ],function(error, result){

        if(error){
          console.log('An error has occurred: ' + error );
        }

        if(++destinationCount == num){
          process.exit();
        }
      });
    }
  }).catch(function(error){
    console.log('an error has occurred listng the countries ' + error);
    process.exit();
  });
}



function getCounties(){
  return new Promise(function(resolve, reject){
    models.country.findAll({}).then(function(countries){
      resolve(countries);
    }).catch(function(error){
      reject(Error);
    });
  });
}