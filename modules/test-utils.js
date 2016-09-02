'use strict';

var models  = require('../models');
var Promise = require('promise');
var randomstring = require("randomstring");
var usersProv  = new (require('../modules/users-provider'));
var async = require('async');
var Sequelize = require("sequelize");


var testUtils = {};
testUtils.addDestinationsTimeout = 120000;


testUtils.ensureDestinationCount = function (num, callback){
  var proxyThis = this;
  models.destinations.count().then(function(c){
    if(c < num){
      return proxyThis.addTestDestinations({ num: num}, callback);
    }
    else{
      return callback(null);
    }
  });
}

testUtils.ensureDestinationCountUs = function (num, callback){
  var proxyThis = this;
  models.countries.findOne({ where : { name:  'United States' }}).then(function(country){
    models.destinations.count({ where: {'country_id' : country.id}}).then(function(c){
      if(c < num){
        return proxyThis.addTestDestinations({ num: num, country: country}, callback);
      }
      else{
        return callback(null);
      }
    });
  });
}

var defaultDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. ";

var testAddresses =[
  { 
    address_line1: '800 Alvarado Place',
    address_line2 : '',
    city: 'Santa Barbara',
    province: 'California',
    postal_code: 93103
  },
  { 
    address_line1: '3600 S Las Vegas Blvd',
    address_line2 : '',
    city: 'Las Vegas',
    province: 'Nevada',
    postal_code: 89109
  }
];

testUtils.getRandomDestination = function(){
  return models.destinations.find({
  order: [
    Sequelize.fn( 'RAND' ),
  ]});
}

testUtils.addTestDestination = function(args){
  var countries = [];
  var destination = null;
  return new Promise(function(resolve, reject){
    async.waterfall([
      function getCountries(next){
        getTestCounties().then(function(testCountries){
          countries = testCountries;
          return next(null);
        });
      }, 
      function createOrganization(next){
        var organizationName = "organization - " + randomstring.generate();
        models.organizations.create({ name: organizationName}).then(function(organization){
          var country_id = -1;
          if(args && args.country) {
            country_id = args.country.id;
          } else {
            country_id = countries[Math.floor(Math.random() * countries.length)].id;
          }
          return next(null, country_id, organization.id);
        });
      },
      function createUser(country_id, organization_id, next){
        var email = randomstring.generate() + "@test.com";
        var username = "john" + randomstring.generate();

        usersProv.create({ username: username,
          email: email,
          password: "secret123"
          }).then(function(user){
            return next(null, user.id, country_id, organization_id);
          }).catch(function(err){
            return next(err);
          });
      },
      function createAddress(user_id, country_id, organization_id, next){

        var address = testAddresses[Math.floor(Math.random() * testAddresses.length)];

        models.addresses.create({
          address_line1: address.address_line1,
          address_line2: address.address_line2,
          city: address.city,
          province: address.province,
          postal_code: address.postal_code,
          country_id: country_id
        }).then(function(address) {
          return next(null, user_id, country_id, organization_id, address.id);
        }).catch(function(err){
          return next(err);
        }); 
      },
      function createDestination(user_id,country_id, organization_id, address_id, next){
        var destinationName = "destination " + randomstring.generate(2);
        
        var average_rating =  (Math.random() * 4) + 1; 
        var review_count =  (Math.random() * 9) + 1; 

        models.destinations.create(
        {
          name: destinationName,
          organization_id: organization_id,
          country_id: country_id,
          user_id: user_id,
          address_id: address_id,
          description: defaultDescription,
          average_rating : average_rating,
          review_count : review_count 
        }).then(function(newDestination){    
          destination = newDestination;
          return next(null);
        }).catch(function(err){
           return next(err);
        });
      }],function(error){
        if(error){
          return reject(Error);
        }
        return resolve(destination);
      });
    });
  }


testUtils.addTestDestinations = function(args, callback){
  var num =  10;
  if(args.num){
    num = args.num;
  }

  console.log('Adding ' + num + ' test destinations');

  var returnIds = [];

  getTestCounties().then(function(countries){
    var destinationCount = 0;
    for(var i=0;i < num; i++){      
      async.waterfall([
        function createOrganization(next){
          var organizationName = "organization - " + randomstring.generate();
          models.organizations.create({ name: organizationName}).then(function(organization){
            var country_id = -1;
            if(args.country) {
              country_id = args.country.id;
            } else {
              country_id = countries[Math.floor(Math.random() * countries.length)].id;
            }
            next(null, country_id, organization.id);
            return null;
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
              return null;
            }).catch(function(err){
              next(err);
              return null;
            });
        },
        function createAddress(user_id, country_id, organization_id, next){

          var address = testAddresses[Math.floor(Math.random() * testAddresses.length)];

          models.addresses.create({
            address_line1: address.address_line1,
            address_line2: address.address_line2,
            city: address.city,
            province: address.province,
            postal_code: address.postal_code,
            country_id: country_id
          }).then(function(newAddress) {
            next(null, user_id, country_id, organization_id, newAddress.id);
            return null;
          }).catch(function(err){
            next(err);
            return null;
          }); 
        },
        function createDestination(user_id,country_id, organization_id, address_id, next){
          var destinationName = "destination " + randomstring.generate(1);          
          var average_rating =  (Math.random() * 4) + 1; 
          var review_count =  (Math.random() * 9) + 1;  

          models.destinations.create(
          {
            country_id: country_id,
            user_id: user_id,
            name: destinationName,
            organization_id: organization_id,
            address_id: address_id,
            description: defaultDescription,
            average_rating : average_rating,
            review_count : review_count 
          }).then(function(newDestination){    
            next(null, user_id, country_id, organization_id, address_id, newDestination.id, review_count );
            return null;
          }).catch(function(err){
            next(err);
            return null;
          });
        },
        function createDestinationCategories(user_id,country_id, organization_id, address_id, destination_id, review_count, next){
          models.destination_category_types.findAll().then(function(categoryTypes){
            async.forEach(categoryTypes, function (categoryType, callback){ 
              models.destinations_categories.create({
                destination_category_type_id: categoryType.id,
                destination_id: destination_id
              }).then(function(destinations_category){
                callback();
                return null;
              }).catch(function(err){
                callback(err);
              });
            }, function(err, result) {
              if(err){
                next(err);
                return null;
              }
              else{
                next(null, user_id, country_id, organization_id, address_id, destination_id, review_count);
                return null;
              }
            });
          }).catch(function(err){
            next(err);
            return null;
          });
        },
        function createDestinationReviews(user_id,country_id, organization_id, address_id, destination_id, review_count, next){
          // how to add 4 destination reviews
          var items = [];
          for(var i=0; i < review_count; i++ ){
            items.push(i);
          }

          async.forEach(items, function (id, callback){ 
            var title  = randomstring.generate(10);
            var service_rating =  (Math.random() * 5.0) + 1.0; 
            var overall_rating =  (Math.random() * 5.0) + 1.0; 

            models.destination_reviews.create({
              destination_id: destination_id,
              user_id: user_id,
              title: 'Amazing location!' + title,
              text: defaultDescription,
              service_rating: service_rating,
              overall_rating: overall_rating
            }).then(function(destination_reviews){
              callback();
            }).catch(function(err){
              callback(err);
            });
          }, function(err, result) {
            if(err){
              next(err);
              return null;
            }
            else{
              next(null, user_id, country_id, organization_id, address_id, destination_id);
              return null;
            }
          });
        },
        function createMedias(user_id,country_id, organization_id, address_id, destination_id, next){
          var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
          var title = "Title-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
          var mediaIds = [];
          async.forEach([1,2,3,4], function (id, callback){ 
            var title  = randomstring.generate(10);
              models.medias.create({
              media_type_id: 2,
              destination_id: destination_id,
              location: '/assets/img/samples/destination-image-sample' + id + '.jpeg',
              title: title,
              description: defaultDescription,
              ordinal: id,
              height: 300,
              width: 200
            }).then(function(media){
              mediaIds.push(media.id);
              callback();
            }).catch(function(err){
              callback(err);
            });
          }, function(err) {
            if(err){
              next(err);
              return null;
            }
            else{
              next(null, user_id, country_id, organization_id, address_id, destination_id, mediaIds);
              return null;
            }
          });
        },
        function createDestinationsMedias(user_id,country_id, organization_id, address_id, destination_id,  mediaIds, next){
          async.forEach(mediaIds, function (id, callback){ 
              models.destinations_medias.create({
              destination_id: destination_id,
              media_id : id
            }).then(function(media){
              callback();
            }).catch(function(err){
              callback(err);
            });
          }, function(err) {
            if(err){
              next(err);
              return null;
            }
            else{
              returnIds.push(destination_id)
              next(null, destination_id);
              return null;
            }
          });
        }],function(error){
        if(error){
          console.log('An error has occurred: ' + error );
          if(callback){
            return callback(error);
          }
        }
        
console.log("destinationCount");
console.log(destinationCount);
console.log(num);
console.log("HERE A");

        if(++destinationCount == num){
console.log(callback);
console.log("HERE B");

          if(callback){
            return callback(null, returnIds);
          }
        }

      });
    }
  }).catch(function(error){
    console.log('an error has occurred listng the countries ' + error);
    return callback(error);
  });
}

function getTestCounties(){
  return new Promise(function(resolve, reject){
    models.countries.findAll({where : { $or: [
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
      return resolve(countries);
    }).catch(function(error){
       return reject(Error);
    });
  });
}

module.exports = testUtils;