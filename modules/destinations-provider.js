'use strict';

var models  = require('../models');

var config = require('../config/config.json');
var pageSize = config.destinationsPageSize ? config.destinationsPageSize : 12;

models.destination.belongsTo(models.country);

models.destination.hasMany(models.destinations_categories, { foreignKey: 'destination_id'})
models.destinations_categories.belongsTo(models.destination, {foreignKey: 'destination_id'})


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
  
  this.findAllByDestinationCategory = function(destinationCategoryName, options){
    return new Promise(function(resolve, reject){
      models.destination_category_types.findOne({ where: { 'name': destinationCategoryName }}).then(function(destinationCategory){

        if(!destinationCategory){
          return resolve({ rows: [], count:0});
        }

        models.destination.findAndCountAll({  include: [models.country, {"model" : models.destinations_categories, where: { 'destination_category_type_id': destinationCategory.id }}],
           offset: options.paging.offset, limit: options.paging.limit}).then(function(destinations){
          return resolve(destinations);
        }).catch(function(err){
          return reject(err);
        });
      }).catch(function(error){
        return reject(error);
      });      
    });
    
  } 
  
};

module.exports = destinationsProvider;