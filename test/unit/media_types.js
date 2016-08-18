'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('find all', function () {
  it('should return a valid list of media types', function (done) {
    models.media_types.findAll().then(function(media_type) {
      media_type.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find media_type with name image', function () {
it('should return a valid media_type', function (done) {
  models.media_types.findOne({ where: { name: 'image' }
    }).then(function(media_type) {

      media_type.id.should.equal(1);
      media_type.name.should.equal('image');
      media_type.created.should.be.greaterThan(0);
      media_type.updated.should.be.greaterThan(0);

      done();
    });
  });
});


describe('find media_type with name image', function () {
it('should return a valid media_type', function (done) {
  models.media_types.findOne({ where: { name: 'thumbnail' }
    }).then(function(media_type) {

      media_type.id.should.equal(2);
      media_type.name.should.equal('thumbnail');
      media_type.created.should.be.greaterThan(0);
      media_type.updated.should.be.greaterThan(0);

      done();
    });
  });
});


describe('find media_type with name image', function () {
it('should return a valid media_type', function (done) {
  models.media_types.findOne({ where: { name: 'video' }
    }).then(function(media_type) {

      media_type.id.should.equal(3);
      media_type.name.should.equal('video');
      media_type.created.should.be.greaterThan(0);
      media_type.updated.should.be.greaterThan(0);

      done();
    });
  });
});