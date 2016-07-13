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
      function createOrganization(country_id, next){
        var organizationName = "organization - " + randomstring.generate();
        models.organization.create({ name: organizationName}).then(function(organization){
          next(null, country_id, organization.id);
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
      function createdestination(country_id, organization_id, address_id, next){
        var destinationName = "destination " + randomstring.generate();
        models.destination.create(
        {
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
          destination.ratings_count.should.be.equal(0);
          destination.organization_id.should.be.equal(organization_id);
 
          destination.created.should.be.greaterThan(0);
          destination.updated.should.be.greaterThan(0);
          
          next()
        });
      }
      
    ],function(error, result){
      done();
    });
  });
});
