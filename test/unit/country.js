'use strict';

var models  = require('../../models');
var should  = require('should');

describe('find with name United States', function () {
it('should return a valid country', function (done) {
  models.country.findOne({ where: { name: 'United States' }
    }).then(function(country) {

      country.id.should.greaterThan(0);
      country.name.should.equal('United States');
      country.iso_code2.should.equal('US');
      country.fips.should.equal('US');
      country.tld.should.equal('.us');
      country.created.should.be.greaterThan(0);
      country.updated.should.be.greaterThan(0);

      done();
    });
  });
});

describe('find with name Djibouti', function () {
it('should return a valid country', function (done) {
  models.country.findOne({ where: { name: 'Djibouti' }
    }).then(function(country) {

      country.id.should.greaterThan(0);
      country.name.should.equal('Djibouti');
      country.iso_code2.should.equal('DJ');
      country.fips.should.equal('DJ');
      country.tld.should.equal('.dj');
      country.created.should.be.greaterThan(0);
      country.updated.should.be.greaterThan(0);

      done();
    });
  });
});

describe('find all', function () {
it('should return a valid list of countries', function (done) {
  models.country.findAll().then(function(countries) {

      countries.length.should.equal(266);

      done();
    });
  });
});