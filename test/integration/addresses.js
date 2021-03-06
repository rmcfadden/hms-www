'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('create address', function () {
  it('should return a valid address', function (done) {
    models.countries.find({ where : { iso_code2 : 'US' }}).then(function(country){
      models.addresses.create({
        address_line1: 'testing address1',
        address_line2: 'testing address2',
        city: 'Santa Barbara',
        province: 'California',
        postal_code: '93105',
        country_id: country.id
      }).then(function(address) {

        address.id.should.be.greaterThan(0);
        address.uuid.should.not.be.null();
        address.address_line1.should.be.equal('testing address1');
        address.address_line2.should.be.equal('testing address2');
        address.city.should.be.equal('Santa Barbara');
        address.province.should.be.equal('California');
        address.postal_code.should.be.equal('93105');
        address.country_id.should.be.equal(country.id);
        address.created.should.be.greaterThan(0);
        address.updated.should.be.greaterThan(0);

        address.destroy().then(function(result){          
          result.id.should.be.greaterThan(0);
          done();
        });
      });
    });
  });
});

describe('update address', function () {
  it('should update a address data', function (done) {
    async.waterfall([
      function createAddress(next){
        models.countries.find({where : { iso_code2 : 'US' }}).then(function(country){
	      models.addresses.create({
          address_line1: 'testing address1',
          address_line2: 'testing address2',
          city: 'Santa Barbara',
          province: 'California',
          postal_code: '93105',
          country_id: country.id
	      }).then(function(address) {

          address.id.should.be.greaterThan(0);
          address.uuid.should.not.be.null();
          address.address_line1.should.be.equal('testing address1');
          address.address_line2.should.be.equal('testing address2');
          address.city.should.be.equal('Santa Barbara');
          address.province.should.be.equal('California');
          address.postal_code.should.be.equal('93105');
          address.country_id.should.be.equal(country.id);
          address.created.should.be.greaterThan(0);
          address.updated.should.be.greaterThan(0);

          next(null, address.id, country.id);
	        });
	      });
      },
      function updateAddress(address_id, country_id, next){        
        models.addresses.update(
          { 
            address_line1: 'updated address1',
            address_line2: 'updated address2',
            city: 'Santa Barbara updated',
            province: 'CF',
            postal_code: '931051'
          }, 
          { where: { id: address_id }} 
          ).then(function(address) {   
            next(null, address_id, country_id);
          });
        },
      function findAddress(address_id, country_id, next){
	      models.addresses.find({where : { id : address_id }}).then(function(address){
          address.id.should.be.greaterThan(0);
          address.uuid.should.not.be.null();
          address.address_line1.should.be.equal('updated address1');
          address.address_line2.should.be.equal('updated address2');
          address.city.should.be.equal('Santa Barbara updated');
          address.province.should.be.equal('CF');
          address.postal_code.should.be.equal('931051');
          address.country_id.should.be.equal(country_id);
          address.created.should.be.greaterThan(0);
          address.updated.should.be.greaterThan(0);
          next();
        });
      }
    ],function(error, result){
      if(!error){
      done();
     }
     else{
      done(error);
     }
    });    
  });
});


describe('delete address', function () {
  it('should delete a address', function (done) {
     async.waterfall([
       function createAddress(next){
        models.countries.find({where : { iso_code2 : 'US' }}).then(function(country){
	      models.addresses.create({
          address_line1: 'testing address1',
          address_line2: 'testing address2',
          city: 'Santa Barbara',
          province: 'California',
          postal_code: '93105',
          country_id: country.id
	      }).then(function(address) {

          address.id.should.be.greaterThan(0);
          address.uuid.should.not.be.null();
          address.address_line1.should.be.equal('testing address1');
          address.address_line2.should.be.equal('testing address2');
          address.city.should.be.equal('Santa Barbara');
          address.province.should.be.equal('California');
          address.postal_code.should.be.equal('93105');
          address.country_id.should.be.equal(country.id);
          address.created.should.be.greaterThan(0);
          address.updated.should.be.greaterThan(0);

          next(null, address.id);
	      });
	    });
      },
     function deleteAddress(address_id, next){
         models.addresses.destroy({ where : { id : address_id} })
          .then(function(status) {
	          models.addresses.findAll({where : { id : address_id }}).then(function(addresses){
              addresses.length.should.equal(0);
	            next()
	          });
          });
      }
    ],function(error, result){
     if(!error){
      done();
     }
     else{
      done(error);
     }
    });    
  });
});

describe('find all', function () {
  before(function(done){
    models.countries.find({where : { iso_code2 : 'US' }}).then(function(country){
      models.addresses.create({
        address_line1: 'testing address1',
        address_line2: 'testing address2',
        city: 'Santa Barbara',
        province: 'California',
        postal_code: '93105',
        country_id: country.id
      }).then(function(address) {

        address.id.should.be.greaterThan(0);
        address.uuid.should.not.be.null();
        address.address_line1.should.be.equal('testing address1');
        address.address_line2.should.be.equal('testing address2');
        address.city.should.be.equal('Santa Barbara');
        address.province.should.be.equal('California');
        address.postal_code.should.be.equal('93105');
        address.country_id.should.be.equal(country.id);
        address.created.should.be.greaterThan(0);
        address.updated.should.be.greaterThan(0);

        address.destroy().then(function(result){          
          result.id.should.be.greaterThan(0);
          done();
        });
      });
    });
  })
  it('should return a valid list of address', function (done) {
    models.addresses.findAll().then(function(addresses) {
      addresses.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find address with id 1', function () {
it('should return a valid address', function (done) {
  models.addresses.findOne({ where: { id: 1 }
    }).then(function(address) {
      address.id.should.be.greaterThan(0);
      address.created.should.be.greaterThan(0);
      address.updated.should.be.greaterThan(0);

      done();
    });
  });
});

