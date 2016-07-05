'use strict';

var models  = require('../../models');
var should  = require('should');

describe('create user', function () {
  it('should return a valid user', function (done) {
    models.user.create({
          username: "john",
          password: "secret"
      }).then(function(user) {

        user.id.should.be.greaterThan(0);
        user.username.should.equal("john");
        user.password.should.equal("secret");

        done();
      });  
  });
});