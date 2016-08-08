'use strict';

var models  = require('../models');
var Promise = require('promise');

// Should I move these the models?
//models.user.hasMany(models.users_organizations, { foreignKey: 'user_id'});
//models.user.belongsTo(models.users_organizations, {foreignKey: 'user_id'});

//models.user.hasMany(models.users_organizations, { foreignKey: 'user_id'});
  //models.user.belongsTo(models.users_organizations, {foreignKey: 'user_id'});

models.users_organizations.belongsTo(models.organization);


var me  = function(){
  this.findFromUser = function(user){
    var proxy = this;
    return new Promise(function(resolve, reject){
        models.users_organizations.find({ include: [models.organization], where : { user_id : user.id}}).then(function(users_organizations){

          user.organizations = users_organizations;
          return resolve(user)
        }).catch(function(err){
        return reject(err);
      });
    });
  }
};

module.exports = me;