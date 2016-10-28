'use strict';

var models  = require('../../models');
var should  = require('should');
var randomstring = require("randomstring");
var async = require('async');

describe('find with name United States', function () {
it('should return a valid country', function (done) {
  models.countries.findOne({ where: { name: 'United States' }
    }).then(function(country) {

      country.id.should.greaterThan(0);
      country.name.should.equal('United States');
      country.iso_code2.should.equal('US');
      country.fips.should.equal('US');
      country.tld.should.equal('.us');
      country.created.should.be.greaterThan(0);
      country.updated.should.be.greaterThan(0);

      done();
    });
  });
});

describe('find with name Djibouti', function () {
it('should return a valid country', function (done) {
  models.countries.findOne({ where: { name: 'Djibouti' }
    }).then(function(country) {

      country.id.should.greaterThan(0);
      country.name.should.equal('Djibouti');
      country.iso_code2.should.equal('DJ');
      country.fips.should.equal('DJ');
      country.tld.should.equal('.dj');
      country.created.should.be.greaterThan(0);
      country.updated.should.be.greaterThan(0);

      done();
    });
  });
});

describe('find all', function () {
it('should return a valid list of countries', function (done) {
  models.countries.findAll().then(function(countries) {

      countries.length.should.be.greaterThan(0);

      done();
    });
  });
});


describe('Edit country', function () {
  it('should update a country record', function (done) {
    async.waterfall([
      function findCountry(next){
         models.countries.findOne(
           { where: { name: 'United States' }
         }).then(function(country) {

          country.id.should.greaterThan(0);
          country.name.should.equal('United States');
          country.iso_code2.should.equal('US');
          country.fips.should.equal('US');
          country.tld.should.equal('.us');
          country.created.should.be.greaterThan(0);
          country.updated.should.be.greaterThan(0);

          next(null, country.id);
        });
      },
      function updateCountry(country_id, next){
         models.countries.update({      
          is_visible: 1
         },
         { where: { id : country_id }}).then(function(country) {
          next(null, country_id);
        });  
      },
      function findCountry(country_id, next){
         models.countries.findOne(
           { where: { id: country_id }
         }).then(function(country) {
          country.id.should.greaterThan(0);
          country.name.should.equal('United States');
          country.iso_code2.should.equal('US');
          country.fips.should.equal('US');
          country.tld.should.equal('.us');
          //country.is_visible.should.equal(1);
          country.created.should.be.greaterThan(0);
          country.updated.should.be.greaterThan(0);
          next(null, country.id);
        });
      },
    ],function(error, result){
      if(!error){
        done();
      }
      else{
        done(error);
      }
    });    
  });
});
/*
describe('Delete country', function () {
  it('should delete a country', function (done) {
     async.waterfall([
       function createcountry(next){
      	var countryName = "country" + randomstring.generate();
        var code = randomstring.generate({ length: 2, charset: 'alphabet'});
        var iso = code.toUpperCase();
        var fips = code.toUpperCase();
        var tld = '.' + code.toLowerCase();
        models.countries.create({
              name: countryName,
              iso_code2: iso,
              fips: fips,
              tld: tld,
              is_visible: 1
          }).then(function(country) {
            country.id.should.greaterThan(0);
            country.name.should.equal(countryName);
            country.iso_code2.should.equal(iso);
            country.fips.should.equal(fips);
            country.tld.should.equal(tld);
            country.created.should.be.greaterThan(0);
            country.updated.should.be.greaterThan(0);
            next(null, country.id);
          });
      },
       function deletecountry(country_id){
         models.countries.destroy({ where : { id : country_id} })
         .then(function(status) {
	          models.countries.findAll({where : { id : country_id }}).then(function(country){
              country.length.should.equal(0);
	            done();
	          });
          });
      }
    ],function(error, result){
      if(!error){
        done();
      }
      else{
        done(error);
      }
    });    
  });
});*/