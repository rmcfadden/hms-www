'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

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
    async.waterfall([
      function createUser(next){
        var email = randomstring.generate() + "@test.com";
        var username = "john" + randomstring.generate();

        models.user.create({ username: username,
          email: email,
          password: "secret",
          password_salt: "123"
        }).then(function(user){
          user.id.should.be.greaterThan(0);
          user.username.should.equal(username);
          user.email.should.equal(email);
          user.password.should.equal("secret");
          user.password_salt.should.equal("123");

          user.created.should.be.greaterThan(0);
          user.updated.should.be.greaterThan(0); 
          next(null, username);
        });
      },
      function updateUser(username, next){
        var email = 'test' + randomstring.generate() + "@test.com";

        models.user.update(
          { email: email }, /* set attributes' value */
          { where: { username: username }} /* where criteria */
        ).then(function(user) {   
          next(null, username, email);
        });
      },
      function findUser(username, email, next){
	models.user.find({where : { email : email }}).then(function(user){
	  user.id.should.be.greaterThan(0);
          user.username.should.equal(username);
          user.email.should.equal(email);
          user.password.should.equal("secret");
          user.password_salt.should.equal("123");

          user.created.should.be.greaterThan(0);
          user.updated.should.be.greaterThan(0);
          next();
        });
      }
    ],function(error, result){
      done();
    });    
  });
});


describe('delete user', function () {
  it('should delete a user', function (done) {
     async.waterfall([
       function createUser(next){
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
	   next(null, user.id);
	 });
       },
       function deleteUser(user_id){
         models.user.destroy({ where : { id : user_id} })
          .then(function(status) {
	    models.user.findAll({where : { id : user_id }}).then(function(users){
              users.length.should.equal(0);
	      done();
	    });
        });
      }
    ],function(error, result){
     done();
    });    
  });
});

describe('find all', function () {
it('should return a valid list of users', function (done) {
  models.user.findAll().then(function(users) {
      users.length.should.be.greaterThan(0);
      done();
    });
  });
});

