'use strict';

require('rootpath')();

var models  = require('../../models');
var should  = require('should');
var testUtils  = require('modules/test-utils');

describe('create destination review', function () {
  before(function(done) {
    this.timeout(testUtils.addDestinationsTimeout);
  
    testUtils.ensureDestinationCount(12, function(err, result){
      if(err){
        done(err);
      }
      else{
        done();
      }
    });
  });


  it('should return a valid destination review', function (done) {
    testUtils.getRandomDestination().then(function(destination){

/*
      models.destinations_reviews.create({
        destination_id : destination.id,
      }).then(function(destination_review){

        console.log('destination_review');
        console.log(destination_review);

        done();

      }).catch(function(error){
        return done(error);
      });
*/
      done();
    }).catch(function(error){
      return done(error);
    });
    
  });
});