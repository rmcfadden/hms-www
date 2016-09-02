'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");

var async = require('async');

describe('create destination categories', function () {
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
      function getDestCategoryType(destination_id, next){
        var name = "Type-" + randomstring.generate({ length: 3, charset: 'alphanumeric'});
        models.destination_category_types.create({      
          name: name
        }).then(function(destination_category_types) {
          destination_category_types.id.should.be.greaterThan(0);
          destination_category_types.name.should.equal(name);
          destination_category_types.created.should.be.greaterThan(0);
          destination_category_types.updated.should.be.greaterThan(0); 
          next(null, destination_category_types.id, destination_id);
       }); 
      },
      function createDestinationCategories(destination_category_type_id, destination_id, next){
        
        models.destinations_categories.create(
        {
            destination_category_type_id: destination_category_type_id,
            destination_id: destination_id
        }).then(function(destination_categories){

          destination_categories.id.should.be.greaterThan(0);
          destination_categories.uuid.should.not.be.null();
          destination_categories.destination_category_type_id.should.be.equal(destination_category_type_id);
          destination_categories.destination_id.should.be.equal(destination_id);
 
          destination_categories.created.should.be.greaterThan(0);
          destination_categories.updated.should.be.greaterThan(0);
          
          next(null, destination_categories.id)
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



describe('delete destination categories', function () {
  it('should delete a destination categories', function (done) {
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
      function getDestCategoryType(destination_id, next){
        var name = "Type-" + randomstring.generate({ length: 3, charset: 'alphanumeric'});
        models.destination_category_types.create({      
          name: name
        }).then(function(destination_category_types) {
          destination_category_types.id.should.be.greaterThan(0);
          destination_category_types.name.should.equal(name);
          destination_category_types.created.should.be.greaterThan(0);
          destination_category_types.updated.should.be.greaterThan(0); 
          next(null, destination_category_types.id, destination_id);
       }); 
      },
      function createDestinationCategories(destination_category_type_id, destination_id, next){
        
        models.destinations_categories.create(
        {
            destination_category_type_id: destination_category_type_id,
            destination_id: destination_id
        }).then(function(destination_categories){

          destination_categories.id.should.be.greaterThan(0);
          destination_categories.uuid.should.not.be.null();
          destination_categories.destination_category_type_id.should.be.equal(destination_category_type_id);
          destination_categories.destination_id.should.be.equal(destination_id);
 
          destination_categories.created.should.be.greaterThan(0);
          destination_categories.updated.should.be.greaterThan(0);
          
          next(null, destination_categories.id)
        });
      },
     function deleteDestinationCategories(destination_categories_id){
         models.destinations_categories.destroy({ where : { id : destination_categories_id} })
          .then(function(status) {
	          models.destinations_categories.findAll({where : { id : destination_categories_id }}).then(function(destination_categories){
              destination_categories.length.should.equal(0);
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
      function getDestCategoryType(destination_id, next){
        var name = "Type-" + randomstring.generate({ length: 3, charset: 'alphanumeric'});
        models.destination_category_types.create({      
          name: name
        }).then(function(destination_category_types) {
          destination_category_types.id.should.be.greaterThan(0);
          destination_category_types.name.should.equal(name);
          destination_category_types.created.should.be.greaterThan(0);
          destination_category_types.updated.should.be.greaterThan(0); 
          next(null, destination_category_types.id, destination_id);
       }); 
      },
      function createDestinationCategories(destination_category_type_id, destination_id, next){
        
        models.destinations_categories.create(
        {
            destination_category_type_id: destination_category_type_id,
            destination_id: destination_id
        }).then(function(destination_categories){

          destination_categories.id.should.be.greaterThan(0);
          destination_categories.uuid.should.not.be.null();
          destination_categories.destination_category_type_id.should.be.equal(destination_category_type_id);
          destination_categories.destination_id.should.be.equal(destination_id);
 
          destination_categories.created.should.be.greaterThan(0);
          destination_categories.updated.should.be.greaterThan(0);
          
          next()
        });
      },
    ],function(error, result){
     if(!error){
       
       done();
     } else {
      done(error); 
     }
    }); 
  });
  it('should return a valid list of destination categories', function (done) {
    models.destinations_categories.findAll().then(function(destination_categories) {
      destination_categories.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find destination categories with id 1', function () {
it('should return a valid destination_categories', function (done) {
  models.destinations_categories.findOne({ where: { id: 1 }
    }).then(function(destination_categories) {
      destination_categories.id.should.be.greaterThan(0);
      destination_categories.created.should.be.greaterThan(0);
      destination_categories.updated.should.be.greaterThan(0);

      done();
    });
  });
});