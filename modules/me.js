'use strict';

var models  = require('../models');
var Promise = require('promise');


// Should I move these the models?
models.users.hasMany(models.users_organizations, { foreignKey: 'user_id'})
models.users_organizations.belongsTo(models.users, {foreignKey: 'user_id'})

models.users.hasMany(models.users_roles, { foreignKey: 'user_id'});
models.users_roles.belongsTo(models.users, {foreignKey: 'user_id'});

models.users_organizations.belongsTo(models.organizations);
models.users_roles.belongsTo(models.roles);

var me  = {
  middleware: function (req, res, next){ 
    if(req.user){
      me.findFromUser(req.user).then(function(me){     
       req.me = {
          user_id: me.id,
          username: me.username,
          organizations : me.organizations,
          roles : me.roles
        };
        return next();
      }).catch(function(err){
        return next(err);    
      });

    }else{
      return next();
    }
  }
};

me.findFromUser = function(user){
  return new Promise(function(resolve, reject){
      models.users_organizations.findAll({ include: [models.organizations], where : { user_id : user.id}})
      .then(function(users_organizations){
        user.users_organizations = users_organizations;
        return models.users_roles.findAll({ include: [models.roles], where : { user_id : user.id}});
      }).then(function(users_roles){

        user.users_roles = users_roles;
  
        user.organizations = [];
        for(var i=0; i < user.users_organizations.length; i++){
          var users_organization = user.users_organizations[i];
          if(users_organization.organization){
            user.organizations.push({id: users_organization.organization.id,  name: users_organization.organization.name });         
          }
        }

        user.roles = [];
        for(var i=0; i < user.users_roles.length; i++){
          var users_role = user.users_roles[i];
          if(users_role.role){
            user.roles.push({id: users_role.role.id,  name: users_role.role.name });         
          }
        }

        return resolve(user)
      }).catch(function(err){
        return reject(err);
    });
  });
};



module.exports = me;