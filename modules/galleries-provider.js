'use strict';

var models  = require('../models');
var Promise = require('promise');

var config = require('../config/config.json');
var pageSize = config.pageSize ? config.pageSize : 12;

models.galleries.hasMany(models.galleries_medias, { foreignKey: 'gallery_id'})
models.galleries_medias.belongsTo(models.galleries, {foreignKey: 'gallery_id'})
	
models.galleries.belongsToMany(models.medias, { through: 'galleries_medias'});


var galleriesProvider  = function(){
  this.findAll = function(options){
    return models.galleries.findAndCountAll({ offset: options.paging.offset, limit: options.paging.limit});
  }

  this.findByName = function(name,  options){
    return models.galleries.findOne({ where: { 'name': name }, include: [  models.medias ]});
  }
}

module.exports = galleriesProvider;