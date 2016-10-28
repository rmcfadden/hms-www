'use strict';

require('rootpath')();

var models  = require('../../models');
var should  = require('should');
var testUtils  = require('modules/test-utils');
var models  = require('models');
var randomstring = require("randomstring");

var async = require('async');

describe('create a gallery and media and associate with a galleries_medias item then delete the galleries_media', function () {
  it('should create a valid gallery and media and shed be associated with a valid galleries_media', function (done) {

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
        var description = 'Testing 123 !! 123';

        models.galleries.create({ 
        	name: galleryName,
        	organization_id: organization_id,
        	user_id: user_id,
        	description: description,
        	is_visible: true,
       		is_approved: true,
       		is_moderated: false
        }).then(function(gallery){
          gallery.id.should.be.greaterThan(0);
          gallery.name.should.equal(galleryName);
          gallery.organization_id.should.equal(organization_id);
          gallery.user_id.should.equal(user_id);
          gallery.description.should.equal('Testing 123 !! 123');
          gallery.is_visible.should.be.true();
          gallery.is_approved.should.be.true();
          gallery.is_moderated.should.be.false();
          gallery.created.should.be.greaterThan(0);
          gallery.updated.should.be.greaterThan(0);

          next(null, user_id,country_id, organization_id, gallery);
        });
      },
      function getMediaType(user_id,country_id, organization_id, gallery, next){
        models.media_types.find({where : { name : 'image' }}).then(function(media_type){
          next(null, user_id,country_id, organization_id, gallery, media_type.id);
        });
      },
      function createMedia(user_id,country_id, organization_id, gallery, media_type_id, next){
        var location = "LOC-" + randomstring.generate();
        var name = "Name-" + randomstring.generate();
        var description = "BLA BLA BLA..";
        models.medias.create(
        {
            media_type_id: media_type_id,
            location: location,
            name: name,
            description: description,
            ordinal: 2,
            height: 200,
            width: 300,
            is_approved : true
        }).then(function(media){

          media.id.should.be.greaterThan(0);
          media.uuid.should.not.be.null();
          media.name.should.be.equal(name);
          media.description.should.be.equal(description);
          media.location.should.be.equal(location);
          media.media_type_id.should.be.equal(media_type_id);

          media.height.should.be.equal(200);
          media.width.should.be.equal(300);
          media.is_approved.should.be.true();

          media.created.should.be.greaterThan(0);
          media.updated.should.be.greaterThan(0);
          
          next(null, user_id,country_id, organization_id, gallery, media_type_id, media);
        });
      },
     	function createGalleriesMedia(user_id,country_id, organization_id, gallery, media_type_id, media, next){
        models.galleries_medias.create(
        {
            gallery_id: gallery.id,
            media_id: media.id
        }).then(function(galleries_media){


          galleries_media.id.should.be.greaterThan(0);
          galleries_media.uuid.should.not.be.null();

          galleries_media.gallery_id.should.be.equal(gallery.id);
          galleries_media.media_id.should.be.equal(media.id);

          galleries_media.created.should.be.greaterThan(0);
          galleries_media.updated.should.be.greaterThan(0);

        	next(null, user_id,country_id, organization_id, gallery, media_type_id, media, galleries_media);
        });   	
     	},
    	function deleteGalleriesMedia(user_id,country_id, organization_id, gallery, media_type_id, media, galleries_media, next){       	
       	models.galleries_medias.destroy({ where : { id : galleries_media.id} })
        .then(function(status) {
        	models.galleries_medias.findAll({where : { id : galleries_media.id }}).then(function(galleries_medias){
            galleries_medias.length.should.equal(0);
	          done();
	      	});
	      });
	     }
    ],function(error, result){
      done(error); 
    });
  });
});