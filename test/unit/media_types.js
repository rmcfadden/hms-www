'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('find all', function () {
  before(function(){
    var name = "media-" + randomstring.generate();
      models.media_types.create({      
        name: name
      }).then(function(media_types) {
        media_types.id.should.be.greaterThan(0);
        media_types.name.should.equal(name);
        media_types.created.should.be.greaterThan(0);
        media_types.updated.should.be.greaterThan(0);  
     });  
  })
  it('should return a valid list of media types', function (done) {
    models.media_types.findAll().then(function(media_types) {
      media_types.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find media type with id 1', function () {
it('should return a valid tag', function (done) {
      models.media_types.findOne({ where: { id: 1 }
    }).then(function(media_types) {
      media_types.id.should.be.greaterThan(0);
      media_types.created.should.be.greaterThan(0);
      media_types.updated.should.be.greaterThan(0);  
      done();
    });
  });
});