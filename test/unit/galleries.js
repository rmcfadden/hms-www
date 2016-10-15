'use strict';

require('rootpath')();

var models  = require('../../models');
var should  = require('should');
var testUtils  = require('modules/test-utils');
var models  = require('models');
var randomstring = require("randomstring");

var async = require('async');

describe('create/update/get/delete gallery', function () {
	var galleryName = '';
  
  it('should return a valid gallery, then update and get it and delete it properly', function (done) {
    async.waterfall([
      function getCountry(next){
        models.countries.find({where : { iso_code2 : 'US' }}).then(function(country){
            next(null,country.id);
        });
      },
      function createUser(country_id, next){
        var email = randomstring.generate() + "@test.com";
        var username = "john" + randomstring.generate();

        models.users.create({ username: username,
          email: email,
          password: "secret",
          password_salt: "123"
         }).then(function(user){
          next(null, user.id, country_id);
        });
      },
     function createOrganization(user_id,country_id, next){
        var organizationName = "organization - " + randomstring.generate();
        models.organizations.create({ name: organizationName}).then(function(organization){
          next(null, user_id,country_id, organization.id);
        });
      },
     function createGallery(user_id,country_id, organization_id, next){
        var galleryName = 'gallery - ' + randomstring.generate();
        var title = 'Title - 123';
        var description = 'Testing 123 !! 123';

        models.galleries.create({ 
        	name: galleryName,
        	organization_id: organization_id,
        	user_id: user_id,
        	title: title,
        	description: description,
        	is_visible: true,
       		is_approved: true,
       		is_moderated: false
        }).then(function(gallery){
          gallery.id.should.be.greaterThan(0);
          gallery.name.should.equal(galleryName);
          gallery.organization_id.should.equal(organization_id);
          gallery.user_id.should.equal(user_id);
          gallery.title.should.equal('Title - 123');
          gallery.description.should.equal('Testing 123 !! 123');
          gallery.is_visible.should.be.true();
          gallery.is_approved.should.be.true();
          gallery.is_moderated.should.be.false();
          gallery.created.should.be.greaterThan(0);
          gallery.updated.should.be.greaterThan(0);

          next(null, user_id,country_id, organization_id, gallery);
        });
      },
      function updateGallery(user_id, country_id, organization_id, gallery, next){
       	galleryName += '--UPDATED';
        var title = 'Title - 123 UPDATED' ;
        var description = 'Testing 123 !! 123 UPDATED';

        models.galleries.update({ 
        	name: galleryName,
        	organization_id: organization_id,
        	user_id: user_id,
        	title: title,
        	description: description,
        	is_visible: false,
       		is_approved: false,
       		is_moderated: true
        },
        	{ where: { id: gallery.id } }
        ).then(function(results){

        	results[0].should.equal(1);

          next(null, user_id,country_id, organization_id, gallery);
        });
      },
      function getConfirmUpdateGallery(user_id, country_id, organization_id, gallery, next){       	
       	models.galleries.findById(gallery.id)
       	.then(function(gallery){
          gallery.id.should.be.greaterThan(0);
          gallery.name.should.equal(galleryName);
          gallery.organization_id.should.equal(organization_id);
          gallery.user_id.should.equal(user_id);
          gallery.title.should.equal('Title - 123 UPDATED');
          gallery.description.should.equal('Testing 123 !! 123 UPDATED');
          gallery.is_visible.should.be.false();
          gallery.is_approved.should.be.false();
          gallery.is_moderated.should.be.true();
          gallery.created.should.be.greaterThan(0);
          gallery.updated.should.be.greaterThan(0);

          next(null, user_id,country_id, organization_id, gallery);   			
     		});
      },
      function deleteGallery(user_id, country_id, organization_id, gallery, next){       	
       	models.galleries.destroy({ where : { id : gallery.id} })
        .then(function(status) {
        	models.galleries.findAll({where : { id : gallery.id }}).then(function(galleries){
            galleries.length.should.equal(0);
	          done();
	      	});
	      });
	     }
    ],function(error, result){
      done(error); 
    });
  });
});
