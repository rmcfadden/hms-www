'use strict';

require('rootpath')();

var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

var usersProvider  = require('modules/users-provider');
var usersProv = new usersProvider(); 


describe('create with simple parameters', function () {
  it('should return a valid user', function (done) {
    
    var email = randomstring.generate() + "@test.com";
    var username = "john" + randomstring.generate();

    usersProv.create({ username: username,
      email: email,
      password: "secret123",
    }).then(function(user){   
      user.id.should.be.greaterThan(0);
      user.username.should.equal(username);
      user.email.should.equal(email);
      user.password.should.not.be.null();
      user.password_salt.should.not.be.null();
      user.created.should.be.greaterThan(0);
      user.updated.should.be.greaterThan(0);

      usersProv.verifyPassword(user, "secret123").should.be.true();

      done();
    }).catch(function(error){
      done(error);
    });
  });
});


describe('create with roles and organizations', function () {
  it('should return a valid user', function (done) {
    
    var email = randomstring.generate() + "@test.com";
    var username = "john" + randomstring.generate();

    // TODO: organizations
    var newUser = { username: username,
      email: email,
      password: "secret123",
      roles: ['admin','editor']
    };

    usersProv.create(newUser).then(function(user){   
      
      user.id.should.be.greaterThan(0);
      user.username.should.equal(username);
      user.email.should.equal(email);
      user.password.should.not.be.null();
      user.password_salt.should.not.be.null();
      user.created.should.be.greaterThan(0);
      user.updated.should.be.greaterThan(0);

      // verify the roles
      user.roles[0].name.should.be.equal('admin');
      user.roles[0].role_id.should.be.greaterThan(0);
      user.roles[0].user_id.should.equal(user.id);

      user.roles[1].name.should.be.equal('editor');
      user.roles[1].role_id.should.be.greaterThan(0);
      user.roles[1].user_id.should.equal(user.id);

      usersProv.verifyPassword(user, "secret123").should.be.true();

      done();
    }).catch(function(error){
      done(error);
    });
  });
});