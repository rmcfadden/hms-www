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
      return proxyThis.addTestDestinations(num, 'all', callback);
    }
    else{
      return callback(null);
    }
  });
}

testUtils.ensureDestinationCountUs = function (num, callback){
  var proxyThis = this;
  models.country.findOne({ where : { name:  'United States' }}).then(function(country){
    models.destination.count({ where:{'country_id' : country.id}}).then(function(c){
      if(c < num){
        return proxyThis.addTestDestinations(num, 'us', callback);
      }
      else{
        return callback(null);
      }
    });
  });
}

var defaultDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. ";


testUtils.addTestDestinations = function(num, country, callback){
  if(!num){
    num = 25;
  }

  console.log('Adding ' + num + ' test destinations');
  console.log('Adding ' + country + ' test destinations')

  getCounties().then(function(countries){
    var destinationCount = 0;
    for(var i=0;i < num; i++){      
      async.waterfall([
        function createOrganization(next){
          var organizationName = "organization - " + randomstring.generate();
          models.organization.create({ name: organizationName}).then(function(organization){
            if(country=='us') {
             var country_id = 247;
            } else {
             var country_id = countries[Math.floor(Math.random() * countries.length)].id;
            }
            next(null, country_id, organization.id);
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
            next(null, user_id, country_id, organization_id, address.id);
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
            description: defaultDescription
          }).then(function(destination){    
            next(null, user_id, country_id, organization_id, address_id, destination.id);
          }).catch(function(err){
            next(err);
          });
        }, 
        function createDestinationCategories(user_id,country_id, organization_id, address_id, destination_id, next){
            models.destination_category_types.findAll().then(function(categoryTypes){
              async.forEach(categoryTypes, function (destionatCategoryType, callback){ 
                models.destinations_categories.create({
                  destination_category_type_id: destionatCategoryType.id,
                  destination_id: destination_id
                }).then(function(destinations_category){
                  callback();
                }).catch(function(err){
                  callback(err);
                });
              }, function(err) {
                if(err){
                  return next(err);
                }
                else{
                  next(null, user_id, country_id, organization_id, address_id, destination_id);
                }
              });
            }).catch(function(err){
              return next(err);
            });
        },
        function createDestinationReviews(user_id,country_id, organization_id, address_id, destination_id, next){
          // how to add 4 destination reviews
          async.forEach([1,2,3,4], function (id, callback){ 
            var title  = randomstring.generate(10);
            models.destination_reviews.create({
              destination_id: destination_id,
              user_id: user_id,
              title: 'Amazing location!' + title,
              text: defaultDescription,
              service_rating: 4,
              overall_rating: 3.5
            }).then(function(destination_reviews){
              callback();
            }).catch(function(err){
              callback(err);
            });
          }, function(err) {
            if(err){
              return next(err);
            }
            else{
              next(null, user_id, country_id, organization_id, address_id, destination_id);            
            }
          });
        },
        function createDestinationMedias(user_id,country_id, organization_id, address_id, destination_id, next){
          var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
          var title = "Title-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
          async.forEach([1,2,3,4], function (id, callback){ 
            var title  = randomstring.generate(10);
              models.destination_medias.create({
              media_type_id: 2,
              destination_id: destination_id,
              location: '/assets/img/samples/destination-image-sample' + id + '.jpeg',
              title: title,
              description: defaultDescription
            }).then(function(destination_reviews){
              callback();
            }).catch(function(err){
              callback(err);
            });
          }, function(err) {
            if(err){
              return next(err);
            }
            else{
              return next(null, destination_id);
            }
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