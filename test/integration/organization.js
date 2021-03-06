'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require("async");

describe('create organization', function () {
  it('should return a valid organization', function (done) {
    var organizationName = "organization" + randomstring.generate();
    models.organizations.create({
          name: organizationName,
      }).then(function(organization) {
        organization.id.should.be.greaterThan(0);
        organization.name.should.equal(organizationName);

        organization.destroy().then(function(result){
          result.id.should.be.greaterThan(0);
          done();
      });
    })
  });
});

describe('Edit organization', function () {
  it('should update a organization record', function (done) {
    async.waterfall([
      function createorganization(next){
      	var name = randomstring.generate() + "-organization";
        models.organizations.create({      
          name: name,
        }).then(function(organization) {
          organization.id.should.be.greaterThan(0);
          organization.name.should.equal(name);
          organization.created.should.be.greaterThan(0);
          organization.updated.should.be.greaterThan(0);
          next(null, organization.id);
        });   
      },
      function updateorganization(organization_id, next){
	      var name = randomstring.generate() + "-organizationUpdate";
        models.organizations.update({      
          name: name,
        },
        { where: { id : organization_id }}).then(function(organization) {
		      next(null, organization_id, name );
        });       
      },
      function findorganization(organization_id, name, next){
        models.organizations.find({where : { id : organization_id }}).then(function(organization){
          organization.id.should.be.greaterThan(0);
          organization.name.should.equal(name);
          organization.created.should.be.greaterThan(0);
          organization.updated.should.be.greaterThan(0);
          next();
        });
      }
    ], function(error, result) {
	    if(!error){
       done(); 
      } else {
       done(error); 
      }
    });    
  });
});

describe('Delete organization', function () {
  it('should delete a organization', function (done) {
     async.waterfall([
       function createorganization(next){
      	var name = randomstring.generate() + "-organization";
        models.organizations.create({      
          name: name,
        }).then(function(organization) {
          organization.id.should.be.greaterThan(0);
          organization.name.should.equal(name);
          organization.created.should.be.greaterThan(0);
          organization.updated.should.be.greaterThan(0);
          next(null, organization.id);
        });   
      },
       function deleteorganization(organization_id){
         models.organizations.destroy({ where : { id : organization_id} })
         .then(function(status) {
	          models.organizations.findAll({where : { id : organization_id }}).then(function(organization){
              organization.length.should.equal(0);
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
  before(function(done){
    var name = randomstring.generate() + "-organization";
    models.organizations.create({      
      name: name,
    }).then(function(organization) {
      organization.id.should.be.greaterThan(0);
      organization.name.should.equal(name);
      organization.created.should.be.greaterThan(0);
      organization.updated.should.be.greaterThan(0);
      done();
    });   
  })
  it('should return a valid list of organization', function (done) {
    models.organizations.findAll().then(function(organization) {
      organization.length.should.be.greaterThan(0);
      done();
    });
  });
});


describe('find organization with id 1', function () {
it('should return a valid organization', function (done) {
      models.organizations.findOne({ where: { id: 1 }
    }).then(function(organization) {
      organization.id.should.be.greaterThan(0);
      organization.created.should.be.greaterThan(0);
      organization.updated.should.be.greaterThan(0);  
      done();
    });
  });
});