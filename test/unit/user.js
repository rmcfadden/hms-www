'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");

describe('create user', function () {
  it('should return a valid user', function (done) {
    var email = randomstring.generate() + "@test.com";
    var username = "john" + randomstring.generate();
    models.user.create({
      username: username,
      email: email,
      password: "secret",
      password_salt: "123"
    }).then(function(user) {
      user.id.should.be.greaterThan(0);
      user.username.should.equal(username);
      user.email.should.equal(email);
      user.password.should.equal("secret");
      user.password_salt.should.equal("123");

      user.created.should.be.greaterThan(0);
      user.updated.should.be.greaterThan(0);

      done();
    });
  });
});

describe('update user', function () {
  it('should update a email id', function (done) {
    var email = 'test' + randomstring.generate() + "@test.com";
    models.user.update(
      { email: email }, /* set attributes' value */
      { where: { username: 'johnNtOPTZR9EKn12JQs5lwYQTzqTWMEjj9s' }} /* where criteria */
    ).then(function(user) {    
      done();
    })
  });
});


describe('delete user', function () {
  it('should delete a user', function (done) {
    var email = randomstring.generate() + "@abc.com";
    var username = "Tim" + randomstring.generate();
    models.user.create({
      username: username,
      email: email,
      password: "secret",
      password_salt: "123"
    }).then(function(user) {
      user.id.should.be.greaterThan(0);
      user.username.should.equal(username);
      user.email.should.equal(email);
      user.password.should.equal("secret");
      user.password_salt.should.equal("123");

      user.created.should.be.greaterThan(0);
      user.updated.should.be.greaterThan(0);
      
      models.user.destroy({ where : { id : user.id} })
      .then(function(status) {

      });
      done();
    });    
  });
});



