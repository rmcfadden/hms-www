'use strict';

require('rootpath')();

var models  = require('../../models');
var should  = require('should');
var testUtils  = require('modules/test-utils');
var models  = require('models');


describe('create/update/get/delete destination review', function () {
  var newdestinationReview = null;
  it('should return validate destination review and update properly and get and delete', function (done) {
    testUtils.addTestDestination().then(function(destination){
      models.destination_reviews.create({
        destination_id: destination.id,
        user_id: destination.user_id,
        title: 'test title',
        text: 'test text',
        overall_rating: 2,
        service_rating: 2
      }).then(function(destinationReview){

        destinationReview.id.should.be.greaterThan(0);

        destinationReview.destination_id.should.equal(destination.id);
        destinationReview.user_id.should.equal(destination.user_id);

        destinationReview.title.should.equal('test title');
        destinationReview.text.should.equal('test text');

        destinationReview.overall_rating.should.equal(2);
        destinationReview.service_rating.should.equal(2);

        destinationReview.is_moderated.should.be.true();
        destinationReview.is_approved.should.be.false();

        destinationReview.created.should.be.greaterThan(0);
        destinationReview.updated.should.be.greaterThan(0);

        newdestinationReview = destinationReview;

        return models.destination_reviews.update({
          title: 'test title 2 ',
          text: 'test text 2',
          overall_rating: 3,
          service_rating: 4,
          is_moderated: false,
          is_approved: true
          }, { where : {id: destinationReview.id }}
        );
      }).then(function(updatedDestinationReviewCount){
        updatedDestinationReviewCount[0].should.equal(1);  
        return models.destination_reviews.findById(newdestinationReview.id);
      }).then(function(getDestinationReview){
                
        getDestinationReview.id.should.equal(newdestinationReview.id);

        getDestinationReview.destination_id.should.equal(newdestinationReview.destination_id);
        getDestinationReview.user_id.should.equal(newdestinationReview.user_id);

        getDestinationReview.title.should.equal('test title 2 ');
        getDestinationReview.text.should.equal('test text 2');

        getDestinationReview.overall_rating.should.equal(3);
        getDestinationReview.service_rating.should.equal(4);

        getDestinationReview.is_moderated.should.be.false();
        getDestinationReview.is_approved.should.be.true();

        getDestinationReview.created.should.be.greaterThan(0);
        getDestinationReview.updated.should.be.greaterThan(0);

        return models.destinations.destroy({ where : { id : getDestinationReview.id } })
      }).then(function(deletedDestinationReview){

        deletedDestinationReview.should.equal(0);

        done();
      });



    }).catch(function(error){
      return done(error);
    });
  });
});
