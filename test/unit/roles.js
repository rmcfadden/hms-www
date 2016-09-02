'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require('randomstring');

describe('find role with name admin', function () {
it('should return a valid role', function (done) {
  models.roles.findOne({ where: { name: 'public' }
    }).then(function(role) {

      role.id.should.equal(1);
      role.name.should.equal('public');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});

describe('find role with name admin', function () {
it('should return a valid role', function (done) {
  models.roles.findOne({ where: { name: 'admin' }
    }).then(function(role) {

      role.id.should.equal(2);
      role.name.should.equal('admin');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});

describe('find role with name editor', function () {
it('should return a valid role', function (done) {
  models.roles.findOne({ where: { name: 'editor' }
    }).then(function(role) {

      role.id.should.equal(3);
      role.name.should.equal('editor');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});

describe('find role with name organization_admin', function () {
it('should return a valid role', function (done) {
  models.roles.findOne({ where: { name: 'organization_admin' }
    }).then(function(role) {

      role.id.should.equal(4);
      role.name.should.equal('organization_admin');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});


describe('find role with name organization_editor', function () {
it('should return a valid role', function (done) {
  models.roles.findOne({ where: { name: 'organization_editor' }
    }).then(function(role) {

      role.id.should.equal(5);
      role.name.should.equal('organization_editor');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});


describe('find all', function () {
it('should return a valid list of roles', function (done) {
  models.roles.findAll().then(function(roles) {
      roles.length.should.equal(5);
      done();
    });
  });
});