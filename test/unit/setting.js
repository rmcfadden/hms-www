'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('Create settings', function () {
  it('should create a valid settings record', function (done) {
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
			  next(null, setting_categories.id);
			});  
       },
       function createSetting(category_id){
		 var name = "Setting " + randomstring.generate({ length: 3, charset: 'numeric' });
		 var value = randomstring.generate();
         models.settings.create({
		   setting_category_id: category_id,
		   name: name,
		   value: value
		 }).then(function(settings) {
		   settings.id.should.be.greaterThan(0);
		   settings.setting_category_id.should.equal(category_id);
		   settings.name.should.be.equal(name);
		   settings.value.should.be.equal(value);
		   settings.created.should.be.greaterThan(0);
		   settings.updated.should.be.greaterThan(0);
		   done();
		 });
      }
    ],function(error, result){
     done();
    });    
  });
});

describe('Update settings', function () {
  it('should update a settings data', function (done) {
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
            next(null, setting_categories.id);
          });  
       },
       function createSetting(category_id, next){
         var name = "Setting " + randomstring.generate({ length: 3, charset: 'numeric' });
         var value = randomstring.generate();
             models.settings.create({
           setting_category_id: category_id,
           name: name,
           value: value
         }).then(function(settings) {
           settings.id.should.be.greaterThan(0);
           settings.setting_category_id.should.equal(category_id);
           settings.name.should.be.equal(name);
           settings.value.should.be.equal(value);
           settings.created.should.be.greaterThan(0);
           settings.updated.should.be.greaterThan(0);
           next(null, settings.id);
         });
      },
      function updatesettings(settings_id, next){
        var name = "Updated " + randomstring.generate({ length: 3, charset: 'numeric' });
        var value = "updated " + randomstring.generate();
            models.settings.update(
              {  
          name: name,
          value: value,
          }, 
              { where: { id: settings_id }} 
        ).then(function(user) {   
          next(null, settings_id, name, value);
        });
      },
      function findsettings(settings_id, name, value, next){
        models.settings.find({where : { id : settings_id }}).then(function(settings){
          settings.id.should.be.greaterThan(0);
          settings.setting_category_id.should.be.greaterThan(0);
          settings.name.should.be.equal(name);
          settings.value.should.be.equal(value);
          settings.created.should.be.greaterThan(0);
          settings.updated.should.be.greaterThan(0);
          done();
        });
      }
    ],function(error, result){
     done();
    });    
  });
});


describe('delete settings', function () {
  it('should delete a settings record', function (done) {
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
            next(null, setting_categories.id);
          });  
       },
       function createSetting(category_id, next){
         var name = "Setting " + randomstring.generate({ length: 3, charset: 'numeric' });
         var value = randomstring.generate();
            models.settings.create({
           setting_category_id: category_id,
           name: name,
           value: value
         }).then(function(settings) {
           settings.id.should.be.greaterThan(0);
           settings.setting_category_id.should.equal(category_id);
           settings.name.should.be.equal(name);
           settings.value.should.be.equal(value);
           settings.created.should.be.greaterThan(0);
           settings.updated.should.be.greaterThan(0);
           next(null, settings.id);
         });
      },
      function deletesettings(settings_id){
         models.settings.destroy({ where : { id : settings_id} })
          .then(function(status) {
	          models.settings.findAll({where : { id : settings_id }}).then(function(settingss){
            settingss.length.should.equal(0);
	          done();
	        });
        });
      }
    ],function(error, result){
     done();
    });    
  });
});

describe('Find all settings', function () {
  before(function(){
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
            next(null, setting_categories.id);
          });  
       },
       function createSetting(category_id, next){
         var name = "Setting " + randomstring.generate({ length: 3, charset: 'numeric' });
         var value = randomstring.generate();
            models.settings.create({
           setting_category_id: category_id,
           name: name,
           value: value
         }).then(function(settings) {
           settings.id.should.be.greaterThan(0);
           settings.setting_category_id.should.equal(category_id);
           settings.name.should.be.equal(name);
           settings.value.should.be.equal(value);
           settings.created.should.be.greaterThan(0);
           settings.updated.should.be.greaterThan(0);
           next(null, settings.id);
         });
      }
    ],function(error, result){
     done();
    });   
  })
  it('should return a valid list of settings', function (done) {
    models.settings.findAll().then(function(settings) {
      settings.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find settings with id 1', function () {
it('should return a valid settings record', function (done) {
  models.settings.findOne({ where: { id: 1 }
    }).then(function(settings) {
      settings.id.should.be.greaterThan(0);
      settings.created.should.be.greaterThan(0);
      settings.updated.should.be.greaterThan(0);
      done();
    });
  });
});
