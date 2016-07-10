'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");

describe('create organization', function () {
  it('should return a valid organization', function (done) {
    var organizationName = "organization" + randomstring.generate();
    models.organization.create({
          name: organizationName,
      }).then(function(organization) {

        organization.id.should.be.greaterThan(0);
        organization.name.should.equal(organizationName);

        organization.destroy().then(function(result){
          result.id.should.be.greaterThan(0);
        done();
      });
    })
  });
});