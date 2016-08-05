'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');
var moment = require('moment');

describe('Create contact', function () {
  it('should create a valid contact', function (done) {
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
       function createContact(user_id){
         var name = randomstring.generate();
         var now = moment();
         var first_name = "first-" + name;
         var middle_name = "middle-" + name;
         var last_name = "last-" + name;
         models.contacts.create({
           user_id: user_id,
           first_name: first_name,
           middle_name: middle_name,
           last_name: last_name,
           date_of_birth: now.subtract(20, 'y')
         }).then(function(contact) {
           contact.user_id.should.equal(user_id);
           contact.id.should.be.greaterThan(0);
           contact.user_id.should.be.greaterThan(0);
           contact.first_name.should.equal(first_name);
           contact.middle_name.should.equal(middle_name);
           contact.last_name.should.equal(last_name);
           contact.date_of_birth.should.be.greaterThan(0);
           contact.created.should.be.greaterThan(0);
           contact.updated.should.be.greaterThan(0);
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


describe('Update contacts', function () {
  it('should update a contacts data', function (done) {
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
       function createContact(user_id, next){
         var name = randomstring.generate();
         var now = moment();
         var first_name = "first-" + name;
         var middle_name = "middle-" + name;
         var last_name = "last-" + name;
         models.contacts.create({
           user_id: user_id,
           first_name: first_name,
           middle_name: middle_name,
           last_name: last_name,
           date_of_birth: now.subtract(20, 'y')
         }).then(function(contact) {
           contact.user_id.should.equal(user_id);
           contact.id.should.be.greaterThan(0);
           contact.user_id.should.be.greaterThan(0);
           contact.first_name.should.equal(first_name);
           contact.middle_name.should.equal(middle_name);
           contact.last_name.should.equal(last_name);
           contact.date_of_birth.should.be.greaterThan(0);
           contact.created.should.be.greaterThan(0);
           contact.updated.should.be.greaterThan(0);
           next(null, contact.id);
         });
      },
      function updatecontacts(contacts_id, next){
	      var name = randomstring.generate(2);
        var now = moment();
        var first_name = "first-" + name + 'updated';
        var middle_name = "middle-" + name + 'updated';
        var last_name = "last-" + name + 'updated';
        models.contacts.update(
        {  
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          date_of_birth: now.subtract(25, 'y')
        }, 
        { where: { id: contacts_id}} 
        ).then(function(user) {   
          next(null, contacts_id, first_name, middle_name, last_name );
        });
      },
      function findcontacts(contacts_id, first_name, middle_name, last_name, next){
        models.contacts.find({where : { id : contacts_id }}).then(function(contact){
          contact.id.should.be.greaterThan(0);
          contact.user_id.should.be.greaterThan(0);
          contact.first_name.should.equal(first_name);
          contact.middle_name.should.equal(middle_name);
          contact.last_name.should.equal(last_name);
          contact.date_of_birth.should.be.greaterThan(0);
          contact.created.should.be.greaterThan(0);
          contact.updated.should.be.greaterThan(0);
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

describe('delete contacts', function () {
  it('should delete a contacts record', function (done) {
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
       function createContact(user_id, next){
         var name = randomstring.generate();
         var now = moment();
         var first_name = "first-" + name;
         var middle_name = "middle-" + name;
         var last_name = "last-" + name;
         models.contacts.create({
           user_id: user_id,
           first_name: first_name,
           middle_name: middle_name,
           last_name: last_name,
           date_of_birth: now.subtract(20, 'y')
         }).then(function(contact) {
           contact.user_id.should.equal(user_id);
           contact.id.should.be.greaterThan(0);
           contact.user_id.should.be.greaterThan(0);
           contact.first_name.should.equal(first_name);
           contact.middle_name.should.equal(middle_name);
           contact.last_name.should.equal(last_name);
           contact.date_of_birth.should.be.greaterThan(0);
           contact.created.should.be.greaterThan(0);
           contact.updated.should.be.greaterThan(0);
           next(null, contact.id);
         });
      },
      function deletecontact(contacts_id){
        models.contacts.destroy({ where : { id : contacts_id} })
        .then(function(status) {
          models.contacts.findAll({where : { id : contacts_id }}).then(function(contacts){
            contacts.length.should.equal(0);
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

describe('Find all contacts', function () {
  it('should return a valid list of contacts', function (done) {
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
       function createContact(user_id, next){
         var name = randomstring.generate();
         var now = moment();
         var first_name = "first-" + name;
         var middle_name = "middle-" + name;
         var last_name = "last-" + name;
         models.contacts.create({
           user_id: user_id,
           first_name: first_name,
           middle_name: middle_name,
           last_name: last_name,
           date_of_birth: now.subtract(20, 'y')
         }).then(function(contact) {
           contact.user_id.should.equal(user_id);
           contact.id.should.be.greaterThan(0);
           contact.user_id.should.be.greaterThan(0);
           contact.first_name.should.equal(first_name);
           contact.middle_name.should.equal(middle_name);
           contact.last_name.should.equal(last_name);
           contact.date_of_birth.should.be.greaterThan(0);
           contact.created.should.be.greaterThan(0);
           contact.updated.should.be.greaterThan(0);
           next(null, contact.id);
         });
      },
      function findAll(){
        console.log('HERE 269');
        models.contacts.findAll().then(function(contacts) {
          contacts.length.should.be.greaterThan(0);
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


describe('find contacts with id 1', function () {
it('should return a valid contacts record', function (done) {
  models.contacts.findOne({ where: { id: 1 }
    }).then(function(contact) {
       
       contact.id.should.be.greaterThan(0);
       contact.user_id.should.be.greaterThan(0);
       contact.date_of_birth.should.be.greaterThan(0);
       contact.created.should.be.greaterThan(0);
       contact.updated.should.be.greaterThan(0);

      done();
    });
  });
});
