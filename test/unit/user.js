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
  it('should update a users data', function (done) {
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
          { email: email, password : 'secretUpdated', password_salt : '456', is_enabled : 2, is_subscribed: 2, is_subscribed_to_partners: 2 },
          { where: { username: username }}
        ).then(function(user) {   
          next(null, username, email);
        });
      },
      function findUser(username, email, next){
        models.user.find({where : { email : email }}).then(function(user){
          user.id.should.be.greaterThan(0);
          user.username.should.equal(username);
          user.email.should.equal(email);
          user.password.should.equal("secretUpdated");
          user.password_salt.should.equal("456");
          user.is_enabled.should.equal(2);
          user.is_subscribed.should.equal(2);
          user.is_subscribed_to_partners.should.equal(2);

          user.created.should.be.greaterThan(0);
          user.updated.should.be.greaterThan(0);
          next();
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
         models.user.destroy({ where : { id : user_id} }).then(function(status) {
	          models.user.findAll({where : { id : user_id }}).then(function(users){
              users.length.should.equal(0);
	            done();
	          });
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

describe('find all', function () {
  before(function(){
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
      });
  })

  it('should return a valid list of users', function (done) {
    models.user.findAll().then(function(users) {
      users.length.should.be.greaterThan(0);
      done();
    });
  });
});