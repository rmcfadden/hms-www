'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('Create destination_attribute_categories', function () {
  it('should create a valid destination_attribute_categories record', function (done) {
     async.waterfall([
       function createdestinationAttributeCategoryTypes(next){
          var name = "Type-" + randomstring.generate();
          models.destination_attribute_category_types.create({      
            name: name
          }).then(function(destination_attribute_category_types) {
            destination_attribute_category_types.id.should.be.greaterThan(0);
            destination_attribute_category_types.name.should.equal(name);
            destination_attribute_category_types.created.should.be.greaterThan(0);
            destination_attribute_category_types.updated.should.be.greaterThan(0);  
            next(null, destination_attribute_category_types.id);
         });  
       },
       function createCategory(category_type_id){
         var name = "Cat " + randomstring.generate({ length: 3, charset: 'numeric' });
         console.log(name);
         models.destination_attribute_categories.create({
           category_type_id: category_type_id,
           name: name
         }).then(function(destination_attribute_category) {
           destination_attribute_category.id.should.be.greaterThan(0);
           destination_attribute_category.category_type_id.should.be.equal(category_type_id);
           destination_attribute_category.name.should.be.equal(name);
           destination_attribute_category.created.should.be.greaterThan(0);
           destination_attribute_category.updated.should.be.greaterThan(0);
           done();
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

describe('Update destination_attribute_categories', function () {
  it('should update a destination_attribute_categories data', function (done) {
     async.waterfall([
       function createdestinationAttributeCategoryTypes(next){
          var name = "Type-" + randomstring.generate();
          models.destination_attribute_category_types.create({      
            name: name
          }).then(function(destination_attribute_category_types) {
            destination_attribute_category_types.id.should.be.greaterThan(0);
            destination_attribute_category_types.name.should.equal(name);
            destination_attribute_category_types.created.should.be.greaterThan(0);
            destination_attribute_category_types.updated.should.be.greaterThan(0);  
            next(null, destination_attribute_category_types.id);
         });  
       },
       function createCategory(category_type_id, next){
         var name = "Cat " + randomstring.generate({ length: 3, charset: 'numeric' });
         var value = randomstring.generate();
         models.destination_attribute_categories.create({
           category_type_id: category_type_id,
           name: name,
         }).then(function(destination_attribute_categories) {
           destination_attribute_categories.id.should.be.greaterThan(0);
           destination_attribute_categories.category_type_id.should.equal(category_type_id);
           destination_attribute_categories.name.should.be.equal(name);
           destination_attribute_categories.created.should.be.greaterThan(0);
           destination_attribute_categories.updated.should.be.greaterThan(0);
           next(null, destination_attribute_categories.id);
         });
      },
      function updatedestination_attribute_categories(destination_attribute_categories_id, next){
        var name = "Updated " + randomstring.generate({ length: 3, charset: 'numeric' });
        models.destination_attribute_categories.update(
        {  
          name: name
        }, 
        { where: { id: destination_attribute_categories_id }} 
        ).then(function(status) {   
          next(null, destination_attribute_categories_id, name);
        });
      },
      function finddestination_attribute_categories(destination_attribute_categories_id, name, next){
        models.destination_attribute_categories.find({where : { id : destination_attribute_categories_id }}).then(function(destination_attribute_categories){
          destination_attribute_categories.id.should.be.greaterThan(0);
          destination_attribute_categories.category_type_id.should.be.greaterThan(0);
          destination_attribute_categories.name.should.be.equal(name);
          destination_attribute_categories.created.should.be.greaterThan(0);
          destination_attribute_categories.updated.should.be.greaterThan(0);
          done();
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

describe('delete destination_attribute_categories', function () {
  it('should delete a destination_attribute_categories record', function (done) {
     async.waterfall([
       function createdestinationAttributeCategoryTypes(next){
          var name = "Type-" + randomstring.generate();
          models.destination_attribute_category_types.create({      
            name: name
          }).then(function(destination_attribute_category_types) {
            destination_attribute_category_types.id.should.be.greaterThan(0);
            destination_attribute_category_types.name.should.equal(name);
            destination_attribute_category_types.created.should.be.greaterThan(0);
            destination_attribute_category_types.updated.should.be.greaterThan(0);  
            next(null, destination_attribute_category_types.id);
         });  
       },
       function createCategory(category_type_id, next){
         var name = "Cat " + randomstring.generate({ length: 3, charset: 'numeric' });
         var value = randomstring.generate();
         models.destination_attribute_categories.create({
           category_type_id: category_type_id,
           name: name,
         }).then(function(destination_attribute_categories) {
           destination_attribute_categories.id.should.be.greaterThan(0);
           destination_attribute_categories.category_type_id.should.equal(category_type_id);
           destination_attribute_categories.name.should.be.equal(name);
           destination_attribute_categories.created.should.be.greaterThan(0);
           destination_attribute_categories.updated.should.be.greaterThan(0);
           next(null, destination_attribute_categories.id);
         });
      },
      function deletedestination_attribute_categories(destination_attribute_categories_id){
         models.destination_attribute_categories.destroy({ where : { id : destination_attribute_categories_id} })
          .then(function(status) {
	          models.destination_attribute_categories.findAll({where : { id : destination_attribute_categories_id }}).then(function(destination_attribute_categoriess){
            destination_attribute_categoriess.length.should.equal(0);
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

describe('Find all destination_attribute_categories', function () {
  before(function(done){
    async.waterfall([
       function createdestinationAttributeCategoryTypes(next){
          var name = "Type-" + randomstring.generate();
          models.destination_attribute_category_types.create({      
            name: name
          }).then(function(destination_attribute_category_types) {
            destination_attribute_category_types.id.should.be.greaterThan(0);
            destination_attribute_category_types.name.should.equal(name);
            destination_attribute_category_types.created.should.be.greaterThan(0);
            destination_attribute_category_types.updated.should.be.greaterThan(0);  
            next(null, destination_attribute_category_types.id);
         });  
       },
       function createCategory(category_type_id, next){
         var name = "Cat " + randomstring.generate({ length: 3, charset: 'numeric' });
         var value = randomstring.generate();
         models.destination_attribute_categories.create({
           category_type_id: category_type_id,
           name: name,
         }).then(function(destination_attribute_categories) {
           destination_attribute_categories.id.should.be.greaterThan(0);
           destination_attribute_categories.category_type_id.should.equal(category_type_id);
           destination_attribute_categories.name.should.be.equal(name);
           destination_attribute_categories.created.should.be.greaterThan(0);
           destination_attribute_categories.updated.should.be.greaterThan(0);
           next(null, destination_attribute_categories.id);
         });
      },
    ],function(error, result){
     if(!error){
       done();
     } else {
      done(error);	 
     }
    });   
  })
  it('should return a valid list of destination_attribute_categories', function (done) {
    models.destination_attribute_categories.findAll().then(function(destination_attribute_categories) {
      destination_attribute_categories.length.should.be.greaterThan(0);
      done();
    });
  });
});


