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
     if(!error){
       done();
     } else {
      done(error); 
     }
    });    
  });
});


describe('Update session', function () {
  it('should update a session data', function (done) {
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
       function createSession(user_id, next){
	 var token = 'test'+randomstring.generate();
	 var now = moment();

         models.session.create({
	   user_id: user_id,
	   token: token,
	   start: moment(),
           end: moment().add(2, 'h'),
	   last_activity_date: moment().subtract(1, 'd'),
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
		
	   next(null, session.id, user_id);
	 });
      },
      function updateSession(session_id, user_id, next){
	var token = 'updated'+randomstring.generate();
        var now = moment();
	var lastActivity = now.subtract(1, 'd');
	var end = now.add(3, 'h');
        models.session.update(
          {  
	    token: token,
	    start: now,
            end: end,
	    last_activity_date: lastActivity,
	    hit_count: 1,
	  }, 
          { where: { id: session_id }} 
        ).then(function(user) {   
          next(null, session_id, user_id, token);
        });
      },
      function findSession(session_id, user_id, token, next){
	models.session.find({where : { id : session_id }}).then(function(session){
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

describe('delete session', function () {
  it('should delete a session record', function (done) {
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
       function createSession(user_id, next){
	 var token = 'test'+randomstring.generate();
	 var now = moment();

         models.session.create({
	   user_id: user_id,
	   token: token,
	   start: moment(),
           end: moment().add(2, 'h'),
	   last_activity_date: moment().subtract(1, 'd'),
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
		
	   next(null, session.id);
	 });
      },
       function deleteSession(session_id){
         models.session.destroy({ where : { id : session_id} })
          .then(function(status) {
	    models.session.findAll({where : { id : session_id }}).then(function(sessions){
              sessions.length.should.equal(0);
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

describe('Find all sessions', function () {
  it('should return a valid list of sessions', function (done) {
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
       function createSession(user_id, next){

	 var token = 'List'+randomstring.generate();
	 var now = moment();
	 var lastActivity = now.subtract(8, 'h');
	 var end = now.add(1, 'd');
	 models.session.create({
	   user_id: user_id,
	   token: token,
	   start: now,
           end: end,
	   last_activity_date: lastActivity,
	   hit_count: 1,
           is_expired: 0
	 }).then(function(session) {
	   session.token.should.equal(token);
	   session.user_id.should.equal(user_id);
	   session.id.should.be.greaterThan(0);
	   session.start.should.be.greaterThan(0);
	   session.end.should.be.greaterThan(0);
	   session.last_activity_date.should.be.greaterThan(0);
	   session.is_expired.should.equal(false);
  	   session.created.should.be.greaterThan(0);
	   session.updated.should.be.greaterThan(0);
	   next(null);
	 });
      },
      function findAll(){
	console.log('HERE 269');
	models.session.findAll().then(function(sessions) {
          sessions.length.should.be.greaterThan(0);
          done();
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


describe('find session with id 1', function () {
it('should return a valid session record', function (done) {
  models.session.findOne({ where: { id: 1 }
    }).then(function(session) {
      session.id.should.be.greaterThan(0);
      session.user_id.should.be.greaterThan(0);
      session.start.should.be.greaterThan(0);
      session.end.should.be.greaterThan(0);
      session.last_activity_date.should.be.greaterThan(0);
      session.hit_count.should.be.greaterThan(0);
      session.created.should.be.greaterThan(0);
      session.updated.should.be.greaterThan(0);

      done();
    });
  });
});
