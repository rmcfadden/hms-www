'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");

var async = require('async');

describe('create venue', function () {
  it('should return a valid venue', function (done) {

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
      function createVenue(country_id, organization_id, address_id, next){
        var venueName = "venue " + randomstring.generate();
        models.venue.create(
        {
            name: venueName,
            organization_id: organization_id,
            address_id: address_id,
            description: 'bla, bla'
        }).then(function(venue){
          
          venue.id.should.be.greaterThan(0);
          venue.uuid.should.not.be.null();
          venue.name.should.be.equal(venueName);
          venue.description.should.be.equal('bla, bla');
          venue.average_rating.should.be.equal(0);
          venue.ratings_count.should.be.equal(0);
          venue.organization_id.should.be.equal(organization_id);
 
          venue.created.should.be.greaterThan(0);
          venue.updated.should.be.greaterThan(0);
          
          next()
        });
      }
      
    ],function(error, result){
      done();
    });
  });
});
