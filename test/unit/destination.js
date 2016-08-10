'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");

var async = require('async');

describe('create destination', function () {
  it('should return a valid destination', function (done) {

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
        var destinationName = "destination " + randomstring.generate(2);
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
        var destinationName = "destination " + randomstring.generate(2);
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
      function updateDestination(destination_id, next){
        var destinationName = "updatedDest " + randomstring.generate(2);
        models.destination.update(
        {
            name: destinationName,
            description: 'Destination Updated'
        }, 
        { where: { id: destination_id }} 
        ).then(function(destination) {   
          next(null, destination_id);
        });
      },
      function findDestination(destination_id, next){
        models.destination.find({where : { id : destination_id }}).then(function(destination){
          destination.id.should.be.greaterThan(0);
          destination.average_rating.should.be.equal(0);
          destination.review_count.should.be.equal(0);
          destination.created.should.be.greaterThan(0);
          destination.updated.should.be.greaterThan(0);
          
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

describe('delete destination', function () {
  it('should delete a destination', function (done) {
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
      function createDestination(user_id, country_id, organization_id, address_id, next){
        var destinationName = "destination " + randomstring.generate(2);
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
     function deleteDestination(destination_id){
         models.destination.destroy({ where : { id : destination_id} })
          .then(function(status) {
	          models.destination.findAll({where : { id : destination_id }}).then(function(destinations){
              destinations.length.should.equal(0);
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
      function createDestination(user_id, country_id, organization_id, address_id, next){
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
  it('should return a valid list of destinations', function (done) {
    models.destination.findAll().then(function(destinations) {
      destinations.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find destination with id 1', function () {
it('should return a valid destination', function (done) {
  models.destination.findOne({ where: { id: 1 }
    }).then(function(destination) {
      destination.id.should.be.greaterThan(0);
      destination.created.should.be.greaterThan(0);
      destination.updated.should.be.greaterThan(0);

      done();
    });
  });
});
