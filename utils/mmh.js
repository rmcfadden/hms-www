#!/usr/bin/env node

'use strict';

var models  = require('../models');
var Promise = require('promise');
var randomstring = require("randomstring");

var async = require('async');
addTestVenues();

  console.log('Node Environment =' + process.env.NODE_ENV)


function addTestVenues(num){
  if(!num){
    num = 25;
  }

  console.log('Adding ' + num + ' test venues')

  getCounties().then(function(countries){
    var venueCount = 0;
    for(var i=0;i < num; i++){
      async.waterfall([
        function createOrganization(next){
          var organizationName = "organization - " + randomstring.generate();
          models.organization.create({ name: organizationName}).then(function(organization){
            next(null, countries[Math.floor(Math.random() * countries.length)].id, organization.id);
          });
        },
        function createAddress(country_id, organization_id, next){
          models.address.create({
            address_line1: 'testing address1',
            address_line2: 'testing address2',
            city: 'Santa Barbara',
            province: 'California',
            postal_code: '93105',
            country_id: country_id
          }).then(function(address) {
            next(null, country_id, organization_id, address.id)
          });        
        },
        function createVenue(country_id, organization_id, address_id, next){
          var venueName = "venue " + randomstring.generate();
          models.venue.create(
          {
              name: venueName,
              organization_id: organization_id,
              address_id: address_id,
              description: 'bla, bla'
          }).then(function(venue){
            
            next()
          });
        }
        
      ],function(error, result){
        if(++venueCount == num){
          process.exit();
        }
      });
    }
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


function createTestAddress(country_id){
  return new Promise(function(resolve, reject){
    models.address.create(
      {
        address_line1: 'testing address1',
        address_line2: 'testing address2',
        city: 'Santa Barbara',
        province: 'California',
        postal_code: '93105',
        country_id: country_id
      }).then(function(address){
      resolve(address);
    }).catch(function(error){
      reject(Error);
    });
  });
}


function createTestVenue(address_id, organization_id){
  return new Promise(function(resolve, reject){
    
    var venueName = "venue " + randomstring.generate();
    models.venue.create(
      {
        name: venueName,
        organization_id: organization_id,
        address_id: address_id,
        description: 'bla, bla'
      }).then(function(venue){
      resolve(venue);
    }).catch(function(error){
      reject(Error);
    });
  });
}


function createTestOrganization(){
  return new Promise(function(resolve, reject){
    var organizationName = "organization" + randomstring.generate();
    models.organization.create({
        name: organizationName
      }).then(function(organization){
      resolve(organization);
    }).catch(function(error){
      reject(Error);
    });
  });
}