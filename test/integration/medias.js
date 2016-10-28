'use strict';

require('rootpath')();

var models  = require('models/');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('create media', function () {
  it('should return a valid media', function (done) {
    async.waterfall([
      function getMediaType(next){
        models.media_types.find({where : { name : 'image' }}).then(function(media_type){
          next(null,media_type.id);
        });
      },
      function createMedia(media_types_id, next){
        var location = "LOC-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var name = "Title-" + randomstring.generate({ length: 2, charset: 'alphanumeric' });
        var description = "BLA BLA BLA..";
        models.medias.create(
        {
            media_type_id: media_types_id,
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
          media.media_type_id.should.be.equal(media_types_id);

          media.height.should.be.equal(200);
          media.width.should.be.equal(300);
          media.is_approved.should.be.true();

          media.created.should.be.greaterThan(0);
          media.updated.should.be.greaterThan(0);
          
          next(null, media.id)
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