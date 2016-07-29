'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');
var moment = require('moment');

describe('Create Setting Category', function () {
  it('should create a valid Setting Category', function (done) {
    var name = randomstring.generate() + "-setting";
    models.setting_categories.create({      
      name: name
    }).then(function(setting_categories) {
      setting_categories.id.should.be.greaterThan(0);
      setting_categories.name.should.equal(name);
      setting_categories.created.should.be.greaterThan(0);
      setting_categories.updated.should.be.greaterThan(0);
      done();
    });       
  });
});

describe('Edit Setting Category', function () {
  it('should update a Setting Category', function (done) {
    async.waterfall([
      function createSettingCategory(next){
      	var name = randomstring.generate() + "-setting";
        models.setting_categories.create({      
          name: name
        }).then(function(setting_categories) {
          setting_categories.id.should.be.greaterThan(0);
          setting_categories.name.should.equal(name);
          setting_categories.created.should.be.greaterThan(0);
          setting_categories.updated.should.be.greaterThan(0);
          next(null,setting_categories.id);
       });  
      },
      function updateSettingCategory(setting_categories_id, next){
		var name = randomstring.generate() + "-settingUpdate";
        models.setting_categories.update({      
          name: name
        },
        {where: {id : setting_categories_id }}).then(function(setting_categories) {
	  		next(null, setting_categories_id, name );
        });       
      },
      function findSettingCategory(setting_categories_id, name, next){
		models.setting_categories.find({where : { id : setting_categories_id }}).then(function(setting_categories){
			setting_categories.id.should.be.greaterThan(0);
			setting_categories.name.should.equal(name);
			setting_categories.created.should.be.greaterThan(0);
			setting_categories.updated.should.be.greaterThan(0);
			next();
		});
      }
    ], function(error, result) {
	    if(!error){
       done(); 
      } else {
       should.fail(); 
      }
    });    
  });
});

describe('Delete Setting Category', function () {
  it('should delete a Setting Category', function (done) {
     async.waterfall([
       function createSettingCategory(next){
      	var name = randomstring.generate() + "-setting";
        models.setting_categories.create({      
          name: name
        }).then(function(setting_categories) {
          setting_categories.id.should.be.greaterThan(0);
          setting_categories.name.should.equal(name);
          setting_categories.created.should.be.greaterThan(0);
          setting_categories.updated.should.be.greaterThan(0);
          next(null,setting_categories.id);
       });  
      },
       function deleteSettingCategory(setting_categories_id){
         models.setting_categories.destroy({ where : { id : setting_categories_id} })
          .then(function(status) {
	    	models.setting_categories.findAll({where : { id : setting_categories_id }}).then(function(setting_categories){
              setting_categories.length.should.equal(0);
	      	  done();
	    	});
        });
      }
    ],function(error, result){
     if(!error){
       done(); 
      } else {
       should.fail(); 
      }
    });    
  });
});

describe('find all', function () {
  before(function(){
    var name = randomstring.generate() + "-setting";
        models.setting_categories.create({      
          name: name
        }).then(function(setting_categories) {
          setting_categories.id.should.be.greaterThan(0);
          setting_categories.name.should.equal(name);
          setting_categories.created.should.be.greaterThan(0);
          setting_categories.updated.should.be.greaterThan(0);  
       });  
  })
  it('should return a valid list of seting categories', function (done) {
    models.setting_categories.findAll().then(function(setting_categories) {
      setting_categories.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find category with id 1', function () {
it('should return a valid setting Category', function (done) {
  models.setting_categories.findOne({ where: { id: 1 }
    }).then(function(setting_categories) {
      setting_categories.id.should.be.greaterThan(0);
      setting_categories.created.should.be.greaterThan(0);
      setting_categories.updated.should.be.greaterThan(0);  
      done();
    });
  });
});
