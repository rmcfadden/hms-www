'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');
var moment = require('moment');

describe('Create session', function () {
  it('should create a valid session', function (done) {
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
       function createSession(user_id){
	 var token = randomstring.generate();
	 var now = moment();
         models.session.create({
	   user_id: user_id,
	   token: token,
	   start: now,
           end: now.add(2, 'h'),
	   last_activity_date: now.subtract(1, 'd'),
	   hit_count: 1,
           is_expired: 0
	 }).then(function(session) {
	   session.token.should.equal(token);
	   session.user_id.should.equal(user_id);
	   session.id.should.be.greaterThan(0);
	   session.user_id.should.be.greaterThan(0);
	   session.start.should.be.greaterThan(0);
	   session.end.should.be.greaterThan(0);
	   session.last_activity_date.should.be.greaterThan(0);
	   session.hit_count.should.be.greaterThan(0);
	   session.is_expired.should.equal(false);
  	   session.created.should.be.greaterThan(0);
	   session.updated.should.be.greaterThan(0);
	   done();
	 });
      }
    ],function(error, result){
     done();
    });    
  });
});

