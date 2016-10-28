'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('find all', function () {
  before(function(){
    var name = "media-" + randomstring.generate();
      models.destination_category_types.create({      
        name: name
      }).then(function(destination_category_types) {
        destination_category_types.id.should.be.greaterThan(0);
        destination_category_types.name.should.equal(name);
        destination_category_types.created.should.be.greaterThan(0);
        destination_category_types.updated.should.be.greaterThan(0);  
     });  
  })
  it('should return a valid list of media types', function (done) {
    models.destination_category_types.findAll().then(function(destination_category_types) {
      destination_category_types.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find media type with id 1', function () {
it('should return a valid tag', function (done) {
      models.destination_category_types.findOne({ where: { id: 1 }
    }).then(function(destination_category_types) {
      destination_category_types.id.should.be.greaterThan(0);
      destination_category_types.created.should.be.greaterThan(0);
      destination_category_types.updated.should.be.greaterThan(0);  
      done();
    });
  });
});