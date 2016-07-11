#!/usr/bin/env node

'use strict';

var models  = require('../models');
var Promise = require('promise');

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
      createTestAddress(countries[Math.floor(Math.random()  * countries.length) ].id).then(function(address){
          createTestVenue(address.id).then(function(venue){
            if(++venueCount == num){
              process.exit();
            }
          });
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
    models.venue.create(
      {
      }).then(function(venue){
      resolve(address);
    }).catch(function(error){
      reject(Error);
    });
  });
}