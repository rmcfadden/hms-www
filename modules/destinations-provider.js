'use strict';

var models  = require('../models');

var config = require('../config/config.json');
var pageSize = config.destinationsPageSize ? config.destinationsPageSize : 12;

models.destination.belongsTo(models.country);


var destinationsProvider  = function(){
  this.findAll = function(options){
    return models.destination.findAndCountAll({ include: [models.country], offset: options.paging.offset, limit: options.paging.limit});
  }

  this.findAllByIsoCode2 = function(isoCode2, options){
    return models.destination.findAndCountAll({  include: [ {"model" : models.country, where: { 'iso_code2': isoCode2 }}], offset: options.paging.offset, limit: options.paging.limit});  
  }

  this.findOneByIsoCode2AndName = function(isoCode2, name,  options){
    return models.destination.findOne({ where: { 'name': name }, include: [ {"model" : models.country, where: { 'iso_code2': isoCode2 }}]}); 
  }
  
  this.findAllByCategory = function(categoryName, options){
    return new Promise(function(resolve, reject){
      models.destination_category_types.findOne({ where: { 'name': categoryName }}).then(function(categoryType){
        var categoryLookup = [];
        models.destinations_categories.findAll({where: {'destination_category_type_id':categoryType.id}}).then(function(returnDestinations){
          for(var i=0; i < returnDestinations.length; i++)
          {
            categoryLookup.push(returnDestinations[i].destination_id);
          }
           models.destination.findAndCountAll({  where: { 'id': categoryLookup }});  
        });     
      }).catch(function(error){
        console.log('Error occured');
        return reject(error);
      });      
    });
    
  } 
  
};

module.exports = destinationsProvider;