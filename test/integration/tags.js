'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('Create Tags', function () {
  it('should create a valid tag', function (done) {
    var name = randomstring.generate() + "-tag";
    models.tags.create({      
      name: name
    }).then(function(tags) {
      tags.id.should.be.greaterThan(0);
      tags.name.should.equal(name);
      tags.created.should.be.greaterThan(0);
      tags.updated.should.be.greaterThan(0);
      done();
    });       
  });
});

describe('Edit tags', function () {
  it('should update a tag record', function (done) {
    async.waterfall([
      function createTag(next){
      	var name = randomstring.generate() + "-tag";
        models.tags.create({      
          name: name
        }).then(function(tags) {
          tags.id.should.be.greaterThan(0);
          tags.name.should.equal(name);
          tags.created.should.be.greaterThan(0);
          tags.updated.should.be.greaterThan(0);
          next(null,tags.id);
       });  
      },
      function updateTag(tags_id, next){
	    var name = randomstring.generate() + "-tagUpdate";
        models.tags.update({      
          name: name
        },
        {where: {id : tags_id }}).then(function(tag) {
		  next(null, tags_id, name );
        });       
      },
      function findTag(tags_id, name, next){
        models.tags.find({where : { id : tags_id }}).then(function(tags){
          tags.id.should.be.greaterThan(0);
          tags.name.should.equal(name);
          tags.created.should.be.greaterThan(0);
          tags.updated.should.be.greaterThan(0);
          next();
        });
      }
    ], function(error, result) {
	    if(!error){
        done();
      } else {
       done(error); 
      }
    });    
  });
});

describe('Delete Tag', function () {
  it('should delete a tag', function (done) {
     async.waterfall([
       function createTag(next){
      	var name = randomstring.generate() + "-setting";
        models.tags.create({      
          name: name
        }).then(function(tags) {
          tags.id.should.be.greaterThan(0);
          tags.name.should.equal(name);
          tags.created.should.be.greaterThan(0);
          tags.updated.should.be.greaterThan(0);
          next(null,tags.id);
       });  
      },
       function deleteTag(tags_id){
         models.tags.destroy({ where : { id : tags_id} })
         .then(function(status) {
	          models.tags.findAll({where : { id : tags_id }}).then(function(tags){
              tags.length.should.equal(0);
	            done();
	          });
          });
      }
    ],function(error, result){
      if(!error){
        done();
      } else {
       done(error); 
      }
    });    
  });
});

describe('find all', function () {
  before(function(){
    var name = randomstring.generate() + "-tag";
        models.tags.create({      
          name: name
        }).then(function(tags) {
          tags.id.should.be.greaterThan(0);
          tags.name.should.equal(name);
          tags.created.should.be.greaterThan(0);
          tags.updated.should.be.greaterThan(0);  
       });  
  })
  it('should return a valid list of tag', function (done) {
    models.tags.findAll().then(function(tags) {
      tags.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find tag with id 1', function () {
it('should return a valid tag', function (done) {
      models.tags.findOne({ where: { id: 1 }
    }).then(function(tags) {
      tags.id.should.be.greaterThan(0);
      tags.created.should.be.greaterThan(0);
      tags.updated.should.be.greaterThan(0);  
      done();
    });
  });
});