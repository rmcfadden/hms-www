'use strict';

var sessionsProv  = new (require('./sessions-provider'));
var models  = require('../models');

var sessionsMiddleware = function (req, res, next){ 

  if(req.cookies['session-token']){
    sessionsProv.findByToken(req.cookies['session-token']).then(function(session){
      if(!session){
        return null;
      }else{
        return models.users.findById(session.user_id);
      }
    }).then(function(user){
      req.user = user;
      return next();
    }).catch(function(error){
      return next(error);
    });
  }else{
    next();
  }

}


module.exports = sessionsMiddleware;