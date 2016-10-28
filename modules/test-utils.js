'use strict';

var models  = require('../models');
var Promise = require('promise');
var randomstring = require("randomstring");
var usersProv  = new (require('../modules/users-provider'));
var async = require('async');
var Sequelize = require("sequelize");


var testUtils = {};
testUtils.addDestinationsTimeout = 120000;


testUtils.ensureDestinationCount = function (num){
  var proxyThis = this;
  return new Promise(function(resolve, reject){
    models.destinations.count().then(function(c){
      if(c < num){
        proxyThis.addTestDestinations({ num: num}).then(function(results){
          return resolve(results);
        });
      }
      else{
        return resolve(null);
      }
    });
  });
}


testUtils.ensureDestinationCountUs = function (num){
  var proxyThis = this;
  return new Promise(function(resolve, reject){
    models.countries.findOne({ where : { name:  'United States' }}).then(function(country){
      models.destinations.count({ where: {'country_id' : country.id }}).then(function(c){
        if(c < num){
          proxyThis.addTestDestinations({ num: num, country: country}).then(function(results){
            return resolve(results);
          });
        }
        else{
          return resolve(null);
        }
      });
    });
  });
}



var defaultDescription = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scramble. ";

var testAddresses = [
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


testUtils.addTestDestinations = function(args){
  var num =  10;
  if(args.num){
    num = args.num;
  }

  console.log('Adding ' + num + ' test destinations');

  var returnIds = [];
  return new Promise(function(resolve, reject){
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
              return next(null, country_id, organization.id);
            })
          },
          function createUser(country_id, organization_id, next){
            var email = randomstring.generate() + "@test.com";
            var username = "john" + randomstring.generate();

            return usersProv.create({ username: username,
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
            
            return models.addresses.create({
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

            return models.destinations.create(
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
            return models.destination_category_types.findAll().then(function(categoryTypes){            
              return new Promise(function(resolve, reject){            
                async.each(categoryTypes, function (categoryType, callback){ 
                  return models.destinations_categories.create({
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
                    return reject(err);
                  }
                  else{
                    return resolve();
                  }
                });

              }).catch(function(err){
                return next(err);
              }).then(function(result){
                next(null, user_id, country_id, organization_id, address_id, destination_id, review_count);
                return null;
              });
            });
         },
          function createDestinationReviews(user_id,country_id, organization_id, address_id, destination_id, review_count, next){
            // how to add 4 destination reviews
            var items = [];
            for(var i=0; i < review_count; i++ ){
              items.push(i);
            }

            return new Promise(function(resolve, reject){            
              async.forEach(items, function (id, callback){ 
                var title  = randomstring.generate(10);
                var service_rating =  (Math.random() * 5.0) + 1.0; 
                var overall_rating =  (Math.random() * 5.0) + 1.0; 

                return models.destination_reviews.create({
                  destination_id: destination_id,
                  user_id: user_id,
                  title: 'Amazing location!' + title,
                  text: defaultDescription,
                  service_rating: service_rating,
                  overall_rating: overall_rating
                }).then(function(destination_reviews){
                  return callback();
                }).catch(function(err){
                  return callback(err);
                });
              }, function(err, result) {
                if(err){
                  return reject(error);
                }
                else{
                  return resolve();
                }
              });
            }).then(function(result){
              next(null, user_id, country_id, organization_id, address_id, destination_id);
              return null;
            });
          },
          function createMedias(user_id,country_id, organization_id, address_id, destination_id, next){
            var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
            var name = "Name-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
            var mediaIds = [];

            return new Promise(function(resolve, reject){            

              return async.forEach([1,2,3,4], function (id, callback){ 
                var title  = randomstring.generate(10);
                return models.medias.create({
                  media_type_id: 2,
                  destination_id: destination_id,
                  location: '/assets/img/samples/destination-image-sample' + id + '.jpeg',
                  name: name,
                  description: defaultDescription,
                  ordinal: id,
                  height: 300,
                  width: 200
                }).then(function(media){
                  mediaIds.push(media.id);
                  return callback();
                }).catch(function(err){
                  return callback(err);
                });
              }, function(err) {
                if(err){
                  return reject(err);
                }
                else{
                  return resolve();
                }
              });
            }).then(function(result){
              return next(null, user_id, country_id, organization_id, address_id, destination_id, mediaIds);
              return null;
            });

          },
          function createDestinationsMedias(user_id,country_id, organization_id, address_id, destination_id,  mediaIds, next){
            return async.forEach(mediaIds, function (id, callback){ 
              models.destinations_medias.create({
                destination_id: destination_id,
                media_id : id
              }).then(function(media){
                return callback();
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
                return next(null, destination_id);
              }
            });
          }],function(error){
          if(error){
            console.log('An error has occurred: ' + error );
            return reject(error);
          }
          
          if(++destinationCount == num){
            return resolve(returnIds);
          }

        });
      }
    }).catch(function(error){
      console.log('an error has occurred listng the countries ' + error);
      return reject(error);
    });
  });
}


testUtils.addTestGalleries = function(args){
  var num =  10;
  if(args.num){
    num = args.num;
  }

  var returnIds = [];

  return new Promise(function(resolve, reject){    
    getTestCounties().then(function(countries){
      var galleryCount = 0;
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

            return usersProv.create({ username: username,
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
          function createGallery(user_id, country_id, organization_id, next)
          {
            var galleryName = 'gallery - ' + randomstring.generate();
            var description = 'Testing 123 !! 123';

            models.galleries.create({ 
              name: galleryName,
              organization_id: organization_id,
              user_id: user_id,
              description: description,
              is_visible: true,
              is_approved: true,
              is_moderated: false
            }).then(function(gallery){
              next(null, user_id, country_id, organization_id, gallery.id);
              return null;
            });
          },
          function createMedias(user_id,country_id, organization_id, gallery_id, next){
            var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
            var name = "Name-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
            var mediaIds = [];

            return new Promise(function(resolve, reject){            
              return async.forEach([1,2,3,4,5,6,7,8], function (id, callback){ 
                var title  = randomstring.generate(10);
                return models.medias.create({
                  media_type_id: 2,
                  location: '/assets/img/samples/gallery-image-sample' + id + '.jpeg',
                  name: name,
                  description: defaultDescription,
                  ordinal: id,
                  height: 300,
                  width: 200
                }).then(function(media){
                  mediaIds.push(media.id);
                  return callback();
                }).catch(function(err){
                  return callback(err);
                });
              }, function(err) {
                if(err){
                  return reject(err);
                }
                else{
                  return resolve();
                }
              });
            }).then(function(result){
              return next(null, user_id, country_id, organization_id, gallery_id, mediaIds);
              return null;
            });
          },
          function createGalleryMedias(user_id,country_id, organization_id, gallery_id, mediaIds, next){
            return async.forEach(mediaIds, function (id, callback){ 
              models.galleries_medias.create({
                gallery_id: gallery_id,
                media_id : id
              }).then(function(galleries_media){
                return callback();
              }).catch(function(err){
                callback(err);
              });
            }, function(err) {
              if(err){
                next(err);
                return null;
              }
              else{
                returnIds.push(gallery_id)
                return next(null, gallery_id);
              }
            });
          }],function(error){

          if(error){
            console.log('An error has occurred: ' + error );
            return reject(error);
           }
          
          if(++galleryCount == num){
            return resolve([]);
          }
        });
      }
    })
  }).catch(function(error){
    console.log('an error has occurred listng the countries ' + error);
    return reject(error);
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