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

};

module.exports = destinationsProvider;