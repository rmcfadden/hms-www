'use strict';

require('rootpath')();

var models  = require('../../models');
var should  = require('should');
var testUtils  = require('modules/test-utils');

describe('create destination review', function () {
  before(function(done) {
    this.timeout(60000);
  
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

      console.log('destination');
      console.log(destination);

      //models.destinations_reviews.

      done();
    }).catch(function(error){
      done(error);
    });
    
  });
});