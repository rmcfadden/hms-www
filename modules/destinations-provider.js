'use strict';

var models  = require('../models');
var Promise = require('promise');

var config = require('../config/config.json');
var pageSize = config.pageSize ? config.pageSize : 12;

// Should I move these the models?

models.destinations.belongsTo(models.countries);
models.destinations.belongsTo(models.addresses);

models.destinations.hasMany(models.destination_reviews, { foreignKey: 'destination_id'})
models.destination_reviews.belongsTo(models.destinations, {foreignKey: 'destination_id'})

models.destinations.hasMany(models.destinations_categories, { foreignKey: 'destination_id'})
models.destinations_categories.belongsTo(models.destinations, {foreignKey: 'destination_id'})

models.destinations.hasMany(models.destinations_medias, { foreignKey: 'destination_id'})
models.destinations_medias.belongsTo(models.destinations, {foreignKey: 'destination_id'})

models.destinations.belongsToMany(models.medias, { through: 'destinations_medias'});
//models.medias.belongsToMany(models.destinations, { through: 'destinations_medias'});


var destinationsProvider  = function(){
  this.findAll = function(options){
    return models.destinations.findAndCountAll({ include: [models.countries], offset: options.paging.offset, limit: options.paging.limit});
  }

  this.findAllByIsoCode2 = function(isoCode2, options){
    return models.destinations.findAndCountAll({  include: [  {"model" : models.countries, where: { 'iso_code2': isoCode2 }}], 
      offset: options.paging.offset, limit: options.paging.limit});  
  }

  this.findOneByIsoCode2AndName = function(isoCode2, name,  options){
    return models.destinations.findOne({ where: { 'name': name }, include: [ models.destination_reviews, models.medias, 
      models.addresses, {"model" : models.countries, where: { 'iso_code2': isoCode2 }}]}); 
  }
  
  this.findAllByDestinationCategory = function(destinationCategoryName, options){
    return new Promise(function(resolve, reject){
      models.destination_category_types.findOne({ where: { 'name': destinationCategoryName }}).then(function(destinationCategory){        
        if(!destinationCategory){
          return resolve({ rows: [], count:0});
        }
        models.destinations.findAndCountAll({  include: [models.countries, {"model" : models.destinations_categories, where: { 'destination_category_type_id': destinationCategory.id }}],
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