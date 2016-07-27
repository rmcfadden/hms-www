'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('Create Inspiration', function () {
  it('should create a valid inspiration', function (done) {
    var name = randomstring.generate() + "-inspiration";
    var title = 'title' + randomstring.generate({ length: 3, charset: 'numeric' });
    models.inspirations.create({      
      name: name,
      title: title,
      description: "This is test inspiration"
    }).then(function(inspirations) {
      inspirations.id.should.be.greaterThan(0);
      inspirations.name.should.equal(name);
      inspirations.title.should.equal(title);
      inspirations.description.should.equal("This is test inspiration");
      inspirations.created.should.be.greaterThan(0);
      inspirations.updated.should.be.greaterThan(0);
      done();
    });       
  });
});

describe('Edit inspirations', function () {
  it('should update a inspiration record', function (done) {
    async.waterfall([
      function createinspiration(next){
      	var name = randomstring.generate() + "-inspiration";
        var title = 'title' + randomstring.generate({ length: 3, charset: 'numeric' });
        models.inspirations.create({      
          name: name,
          title: title,
          description: "This is test inspiration"
        }).then(function(inspirations) {
          inspirations.id.should.be.greaterThan(0);
          inspirations.name.should.equal(name);
          inspirations.title.should.equal(title);
          inspirations.description.should.equal("This is test inspiration");
          inspirations.created.should.be.greaterThan(0);
          inspirations.updated.should.be.greaterThan(0);
          next(null, inspirations.id);
        });   
      },
      function updateinspiration(inspirations_id, next){
	      var name = randomstring.generate() + "-inspirationUpdate";
        var title = 'updated' + randomstring.generate({ length: 3, charset: 'numeric' });
        models.inspirations.update({      
          name: name,
          title: title,
          description: "Test inspiration Updated"
        },
        { where: { id : inspirations_id }}).then(function(inspiration) {
		      next(null, inspirations_id, name );
        });       
      },
      function findinspiration(inspirations_id, name, next){
        models.inspirations.find({where : { id : inspirations_id }}).then(function(inspirations){
          inspirations.id.should.be.greaterThan(0);
          inspirations.name.should.equal(name);
          inspirations.description.should.equal("Test inspiration Updated");
          inspirations.created.should.be.greaterThan(0);
          inspirations.updated.should.be.greaterThan(0);
          next();
        });
      }
    ], function(error, result) {
	  done();
    });    
  });
});

describe('Delete inspiration', function () {
  it('should delete a inspiration', function (done) {
     async.waterfall([
       function createinspiration(next){
      	var name = randomstring.generate() + "-inspiration";
        var title = 'title' + randomstring.generate({ length: 3, charset: 'numeric' });
        models.inspirations.create({      
          name: name,
          title: title,
          description: "This is test inspiration"
        }).then(function(inspirations) {
          inspirations.id.should.be.greaterThan(0);
          inspirations.name.should.equal(name);
          inspirations.title.should.equal(title);
          inspirations.description.should.equal("This is test inspiration");
          inspirations.created.should.be.greaterThan(0);
          inspirations.updated.should.be.greaterThan(0);
          next(null, inspirations.id);
        });   
      },
       function deleteinspiration(inspirations_id){
         models.inspirations.destroy({ where : { id : inspirations_id} })
         .then(function(status) {
	          models.inspirations.findAll({where : { id : inspirations_id }}).then(function(inspirations){
              inspirations.length.should.equal(0);
	            done();
	          });
          });
      }
    ],function(error, result){
      done();
    });    
  });
});

describe('find all', function () {
  before(function(){
    var name = randomstring.generate() + "-inspiration";
    var title = 'title' + randomstring.generate({ length: 3, charset: 'numeric' });
    models.inspirations.create({      
      name: name,
      title: title,
      description: "This is test inspiration"
    }).then(function(inspirations) {
      inspirations.id.should.be.greaterThan(0);
      inspirations.name.should.equal(name);
      inspirations.title.should.equal(title);
      inspirations.description.should.equal("This is test inspiration");
      inspirations.created.should.be.greaterThan(0);
      inspirations.updated.should.be.greaterThan(0);
      done();
    });   
  })
  it('should return a valid list of inspiration', function (done) {
    models.inspirations.findAll().then(function(inspirations) {
      inspirations.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find inspiration with id 1', function () {
it('should return a valid inspiration', function (done) {
      models.inspirations.findOne({ where: { id: 1 }
    }).then(function(inspirations) {
      inspirations.id.should.be.greaterThan(0);
      inspirations.created.should.be.greaterThan(0);
      inspirations.updated.should.be.greaterThan(0);  
      done();
    });
  });
});