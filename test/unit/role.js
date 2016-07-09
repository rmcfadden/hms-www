'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require('randomstring');

describe('find role with name admin', function () {
it('should return a valid role', function (done) {
  models.role.findOne({ where: { name: 'public' }
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
  models.role.findOne({ where: { name: 'admin' }
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
  models.role.findOne({ where: { name: 'editor' }
    }).then(function(role) {

      role.id.should.equal(3);
      role.name.should.equal('editor');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});

describe('find role with name venue_admin', function () {
it('should return a valid role', function (done) {
  models.role.findOne({ where: { name: 'venue_admin' }
    }).then(function(role) {

      role.id.should.equal(4);
      role.name.should.equal('venue_admin');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});


describe('find role with name venue_editor', function () {
it('should return a valid role', function (done) {
  models.role.findOne({ where: { name: 'venue_editor' }
    }).then(function(role) {

      role.id.should.equal(5);
      role.name.should.equal('venue_editor');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});


describe('find role with name blog_admin', function () {
it('should return a valid role', function (done) {
  models.role.findOne({ where: { name: 'blog_admin' }
    }).then(function(role) {

      role.id.should.equal(6);
      role.name.should.equal('blog_admin');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});


describe('find role with name blog_editor', function () {
it('should return a valid role', function (done) {
  models.role.findOne({ where: { name: 'blog_editor' }
    }).then(function(role) {

      role.id.should.equal(7);
      role.name.should.equal('blog_editor');
      role.created.should.be.greaterThan(0);
      role.updated.should.be.greaterThan(0);

      done();
    });
  });
});