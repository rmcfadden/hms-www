'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");

var async = require('async');

describe('create destination media', function () {
  it('should return a valid destination media', function (done) {
    async.waterfall([
      function getCountry(next){
        models.country.find({where : { iso_code2 : 'US' }}).then(function(country){
            next(null,country.id);
        });
      },
      function createUser(country_id, next){
        var email = randomstring.generate() + "@test.com";
        var username = "john" + randomstring.generate();

        models.user.create({ username: username,
          email: email,
          password: "secret",
          password_salt: "123"
         }).then(function(user){
          next(null, user.id, country_id);
        });
      },
      function createOrganization(user_id,country_id, next){
        var organizationName = "organization - " + randomstring.generate();
        models.organization.create({ name: organizationName}).then(function(organization){
          next(null, user_id,country_id, organization.id);
        });
      },
      function createAddress(user_id,country_id, organization_id, next){
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
      function createdestination(user_id, country_id, organization_id, address_id, next){
        var destinationName = "destination " + randomstring.generate({ length: 3, charset: 'alphanumeric' });
        models.destination.create(
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
        models.media_types.find({where : { name : 'image' }}).then(function(media_types){
          next(null,media_types.id, destination_id);
        });
      },
      function createDestinationMedia(media_types_id, destination_id, next){
        var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var title = "Title-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var description = "BLA BLA BLA..";
        models.destination_medias.create(
        {
            media_type_id: media_types_id,
            destination_id: destination_id,
            location: location,
            title: title,
            description: description
        }).then(function(destination_medias){

          destination_medias.id.should.be.greaterThan(0);
          destination_medias.uuid.should.not.be.null();
          destination_medias.title.should.be.equal(title);
          destination_medias.description.should.be.equal(description);
          destination_medias.location.should.be.equal(location);
          destination_medias.media_type_id.should.be.equal(media_types_id);
          destination_medias.destination_id.should.be.equal(destination_id);
 
          destination_medias.created.should.be.greaterThan(0);
          destination_medias.updated.should.be.greaterThan(0);
          
          next(null, destination_medias.id)
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


describe('update destination', function () {
  it('should return a updated destination record', function (done) {

    async.waterfall([
      function getCountry(next){
        models.country.find({where : { iso_code2 : 'US' }}).then(function(country){
            next(null,country.id);
        });
      },
      function createUser(country_id, next){
        var email = randomstring.generate() + "@test.com";
        var username = "john" + randomstring.generate();

        models.user.create({ username: username,
          email: email,
          password: "secret",
          password_salt: "123"
         }).then(function(user){
          next(null, user.id, country_id);
        });
      },
      function createOrganization(user_id,country_id, next){
        var organizationName = "organization - " + randomstring.generate();
        models.organization.create({ name: organizationName}).then(function(organization){
          next(null, user_id,country_id, organization.id);
        });
      },
      function createAddress(user_id,country_id, organization_id, next){
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
      function createdestination(user_id, country_id, organization_id, address_id, next){
        var destinationName = "destination " + randomstring.generate();
        models.destination.create(
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
        models.media_types.find({where : { name : 'image' }}).then(function(media_types){
          next(null,media_types.id, destination_id);
        });
      },
      function createDestinationMedia(media_types_id, destination_id, next){
        var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var title = "Title-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var description = "BLA BLA BLA..";
        models.destination_medias.create(
        {
            media_type_id: media_types_id,
            destination_id: destination_id,
            location: location,
            title: title,
            description: description
        }).then(function(destination_medias){

          destination_medias.id.should.be.greaterThan(0);
          destination_medias.uuid.should.not.be.null();
          destination_medias.title.should.be.equal(title);
          destination_medias.description.should.be.equal(description);
          destination_medias.location.should.be.equal(location);
          destination_medias.media_type_id.should.be.equal(media_types_id);
          destination_medias.destination_id.should.be.equal(destination_id);
 
          destination_medias.created.should.be.greaterThan(0);
          destination_medias.updated.should.be.greaterThan(0);
          
          next(null, destination_medias.id)
        });
      },
      function updateDestinationMedia(destination_medias_id, next){
        var location = "LOC-Updated" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var title = "Title-Updated" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var description = "BLA BLA BLA..Updated";
        models.destination_medias.update(
        {
            location: location,
            title: title,
            description: description
        }, 
        { where: { id: destination_medias_id }} 
        ).then(function(destination_medias) {   
          next(null, destination_medias_id, location, title, description);
        });
      },
      function findDestinationMedias(destination_medias_id, location, title, description, next){
        models.destination_medias.find({where : { id : destination_medias_id }}).then(function(destination_medias){
          destination_medias.id.should.be.greaterThan(0);
          destination_medias.uuid.should.not.be.null();
          destination_medias.media_type_id.should.be.greaterThan(0);
          destination_medias.destination_id.should.be.greaterThan(0);
          destination_medias.location.should.be.equal(location);
          destination_medias.title.should.be.equal(title);
          destination_medias.description.should.be.equal(description);
          destination_medias.created.should.be.greaterThan(0);
          destination_medias.updated.should.be.greaterThan(0);
          
          done();
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
        models.country.find({where : { iso_code2 : 'US' }}).then(function(country){
            next(null,country.id);
        });
      },
      function createUser(country_id, next){
        var email = randomstring.generate() + "@test.com";
        var username = "john" + randomstring.generate();

        models.user.create({ username: username,
          email: email,
          password: "secret",
          password_salt: "123"
         }).then(function(user){
          next(null, user.id, country_id);
        });
      },
      function createOrganization(user_id,country_id, next){
        var organizationName = "organization - " + randomstring.generate();
        models.organization.create({ name: organizationName}).then(function(organization){
          next(null, user_id,country_id, organization.id);
        });
      },
      function createAddress(user_id,country_id, organization_id, next){
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
      function createdestination(user_id, country_id, organization_id, address_id, next){
        var destinationName = "destination " + randomstring.generate();
        models.destination.create(
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
        models.media_types.find({where : { name : 'image' }}).then(function(media_types){
          next(null,media_types.id, destination_id);
        });
      },
      function createDestinationMedia(media_types_id, destination_id, next){
        var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var title = "Title-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var description = "BLA BLA BLA..";
        models.destination_medias.create(
        {
            media_type_id: media_types_id,
            destination_id: destination_id,
            location: location,
            title: title,
            description: description
        }).then(function(destination_medias){

          destination_medias.id.should.be.greaterThan(0);
          destination_medias.uuid.should.not.be.null();
          destination_medias.title.should.be.equal(title);
          destination_medias.description.should.be.equal(description);
          destination_medias.location.should.be.equal(location);
          destination_medias.media_type_id.should.be.equal(media_types_id);
          destination_medias.destination_id.should.be.equal(destination_id);
 
          destination_medias.created.should.be.greaterThan(0);
          destination_medias.updated.should.be.greaterThan(0);
          
          next(null, destination_medias.id)
        });
      },
     function deleteDestination(destination_medias_id){
         models.destination_medias.destroy({ where : { id : destination_medias_id} })
          .then(function(status) {
	          models.destination_medias.findAll({where : { id : destination_medias_id }}).then(function(destination_medias){
              destination_medias.length.should.equal(0);
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

describe('find all', function () {
  before(function(done){
    async.waterfall([
      function getCountry(next){
        models.country.find({where : { iso_code2 : 'US' }}).then(function(country){
            next(null,country.id);
        });
      },
      function createUser(country_id, next){
        var email = randomstring.generate() + "@test.com";
        var username = "john" + randomstring.generate();

        models.user.create({ username: username,
          email: email,
          password: "secret",
          password_salt: "123"
         }).then(function(user){
          next(null, user.id, country_id);
        });
      },
      function createOrganization(user_id,country_id, next){
        var organizationName = "organization - " + randomstring.generate();
        models.organization.create({ name: organizationName}).then(function(organization){
          next(null, user_id,country_id, organization.id);
        });
      },
      function createAddress(user_id,country_id, organization_id, next){
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
      function createdestination(user_id, country_id, organization_id, address_id, next){
        var destinationName = "destination " + randomstring.generate();
        models.destination.create(
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
        models.media_types.find({where : { name : 'image' }}).then(function(media_types){
          next(null,media_types.id, destination_id);
        });
      },
      function createDestinationMedia(media_types_id, destination_id, next){
        var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var title = "Title-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var description = "BLA BLA BLA..";
        models.destination_medias.create(
        {
            media_type_id: media_types_id,
            destination_id: destination_id,
            location: location,
            title: title,
            description: description
        }).then(function(destination_medias){

          destination_medias.id.should.be.greaterThan(0);
          destination_medias.uuid.should.not.be.null();
          destination_medias.title.should.be.equal(title);
          destination_medias.description.should.be.equal(description);
          destination_medias.location.should.be.equal(location);
          destination_medias.media_type_id.should.be.equal(media_types_id);
          destination_medias.destination_id.should.be.equal(destination_id);
 
          destination_medias.created.should.be.greaterThan(0);
          destination_medias.updated.should.be.greaterThan(0);
          
          next()
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
  it('should return a valid list of destination medias', function (done) {
    models.destination_medias.findAll().then(function(destination_medias) {
      destination_medias.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find destination_medias with id 1', function () {
it('should return a valid destination_medias', function (done) {
  models.destination_medias.findOne({ where: { id: 1 }
    }).then(function(destination_medias) {
      destination_medias.id.should.be.greaterThan(0);
      destination_medias.created.should.be.greaterThan(0);
      destination_medias.updated.should.be.greaterThan(0);

      done();
    });
  });
});