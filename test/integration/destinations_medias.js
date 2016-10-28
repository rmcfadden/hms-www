'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");

var async = require('async');

describe('create destination media', function () {
  it('should return a valid destination media', function (done) {
    async.waterfall([
      function getCountry(next){
        models.countries.find({where : { iso_code2 : 'US' }}).then(function(country){
            next(null,country.id);
        });
      },
      function createUser(country_id, next){
        var email = randomstring.generate() + "@test.com";
        var username = "john" + randomstring.generate();

        models.users.create({ username: username,
          email: email,
          password: "secret",
          password_salt: "123"
         }).then(function(user){
          next(null, user.id, country_id);
        });
      },
      function createOrganization(user_id,country_id, next){
        var organizationName = "organization - " + randomstring.generate();
        models.organizations.create({ name: organizationName}).then(function(organization){
          next(null, user_id,country_id, organization.id);
        });
      },
      function createAddress(user_id,country_id, organization_id, next){
        models.addresses.create({
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
      function createdestination(user_id, country_id, organization_id, address_id, next){
        var destinationName = "destination " + randomstring.generate({ length: 3, charset: 'alphanumeric' });
        models.destinations.create(
        {
            user_id: user_id,
            country_id: country_id,
            name: destinationName,
            organization_id: organization_id,
            address_id: address_id,
            description: 'bla, bla'
        }).then(function(destination){

          destination.id.should.be.greaterThan(0);
          destination.uuid.should.not.be.null();
          destination.name.should.be.equal(destinationName);
          destination.description.should.be.equal('bla, bla');
          destination.average_rating.should.be.equal(0);
          destination.review_count.should.be.equal(0);
          destination.organization_id.should.be.equal(organization_id);
 
          destination.created.should.be.greaterThan(0);
          destination.updated.should.be.greaterThan(0);
          
          next(null, destination.id)
        });
      },
      function getMediaType(destination_id, next){
        models.media_types.find({where : { name : 'image' }}).then(function(media_type){
          next(null,media_type.id, destination_id);
        });
      },
      function createMedia(media_types_id, destination_id, next){
        var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var name = "Name-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var description = "BLA BLA BLA..";
        models.medias.create(
        {
            media_type_id: media_types_id,
            location: location,
            name: name,
            description: description,
            ordinal: 2,
            height: 200,
            width: 300,
            is_approved : true
        }).then(function(media){

          media.id.should.be.greaterThan(0);
          media.uuid.should.not.be.null();
          media.name.should.be.equal(name);
          media.description.should.be.equal(description);
          media.location.should.be.equal(location);
          media.media_type_id.should.be.equal(media_types_id);

          media.height.should.be.equal(200);
          media.width.should.be.equal(300);
          media.is_approved.should.be.true();

          media.created.should.be.greaterThan(0);
          media.updated.should.be.greaterThan(0);
          
          next(null, media.id)
        });
      }
      
    ],function(error, result){
      if(!error){
       done();
     } else {
      done(error); 
     }
    });
  });
});


describe('delete destination media', function () {
  it('should delete a destination media', function (done) {
     async.waterfall([
       function getCountry(next){
        models.countries.find({where : { iso_code2 : 'US' }}).then(function(country){
            next(null,country.id);
        });
      },
      function createUser(country_id, next){
        var email = randomstring.generate() + "@test.com";
        var username = "john" + randomstring.generate();

        models.users.create({ username: username,
          email: email,
          password: "secret",
          password_salt: "123"
         }).then(function(user){
          next(null, user.id, country_id);
        });
      },
      function createOrganization(user_id,country_id, next){
        var organizationName = "organization - " + randomstring.generate();
        models.organizations.create({ name: organizationName}).then(function(organization){
          next(null, user_id,country_id, organization.id);
        });
      },
      function createAddress(user_id,country_id, organization_id, next){
        models.addresses.create({
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
      function createdestination(user_id, country_id, organization_id, address_id, next){
        var destinationName = "destination " + randomstring.generate();
        models.destinations.create(
        {
            user_id: user_id,
            country_id: country_id,
            name: destinationName,
            organization_id: organization_id,
            address_id: address_id,
            description: 'bla, bla'
        }).then(function(destination){

          destination.id.should.be.greaterThan(0);
          destination.uuid.should.not.be.null();
          destination.name.should.be.equal(destinationName);
          destination.description.should.be.equal('bla, bla');
          destination.average_rating.should.be.equal(0);
          destination.review_count.should.be.equal(0);
          destination.organization_id.should.be.equal(organization_id);
 
          destination.created.should.be.greaterThan(0);
          destination.updated.should.be.greaterThan(0);
          
          next(null, destination.id);
        });
      },
      function getMediaType(destination_id, next){
        models.media_types.find({where : { name : 'image' }}).then(function(media_type){
          next(null,media_type.id, destination_id);
        });
      },
      function createMedia(media_types_id, destination_id, next){
        var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var name = "Name-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var description = "BLA BLA BLA..";
        models.medias.create(
        {
            media_type_id: media_types_id,
            location: location,
            name: name,
            description: description,
            ordinal: 2,
            height: 200,
            width: 300,
            is_approved : true
        }).then(function(media){

          media.id.should.be.greaterThan(0);
          media.uuid.should.not.be.null();
          media.name.should.be.equal(name);
          media.description.should.be.equal(description);
          media.location.should.be.equal(location);
          media.media_type_id.should.be.equal(media_types_id);
 
          media.created.should.be.greaterThan(0);
          media.updated.should.be.greaterThan(0);
          
          next(null, destination_id, media.id)
        });
      },
      function createDestinationsMedias(destination_id, media_id, next){

        models.destinations_medias.create(
        {
            media_id: media_id,
            destination_id: destination_id
        }).then(function(destinations_media){

          destinations_media.media_id.should.be.equal(destinations_media.media_id);
          destinations_media.destination_id.should.be.equal(destinations_media.destination_id);

          next(null, destinations_media.id)
        }); 
      },
      function deleteDestination(destinations_media_id){
         models.destinations_medias.destroy({ where : { id : destinations_media_id} }).then(function(status) {
	          models.destinations_medias.findAll({where : { id : destinations_media_id }}).then(function(destination_media){
              destination_media.length.should.equal(0);
	            done();
	          });
          });
      }
    ],function(error, result){
     if(!error){
       done();
     } else {
      done(error); 
     }
    });    
  });
});