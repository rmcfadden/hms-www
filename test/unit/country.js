'use strict';

var models  = require('../../models');
var should  = require('should');

describe('find countrie with name united states', function () {
it('should return a valid country', function (done) {
  models.country.findOne({ where: { name: 'United States' }
    }).then(function(country) {

      country.id.should.greaterThan(0);
      country.name.should.equal('United States');
      country.iso_code2.should.equal('United States');
      country.fips.should.equal('US');
      country.tld.should.equal('.us');
      country.created.should.be.greaterThan(0);
      country.updated.should.be.greaterThan(0);

      done();
    });
  });
});

