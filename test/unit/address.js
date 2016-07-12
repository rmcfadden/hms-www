'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");

describe('create address', function () {
  it('should return a valid address', function (done) {
    models.country.find({where : { iso_code2 : 'US' }}).then(function(country){
      models.address.create({
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