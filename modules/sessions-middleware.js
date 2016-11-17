'use strict';

var sessionsProv  = new (require('./sessions-provider'));
var models  = require('../models');

var sessionsMiddleware = function (req, res, next){ 

  var sessionToken = req.cookies['session-token'];
  var redirectUrl = '/admin/login'

  if(sessionToken){
    sessionsProv.findByToken(sessionToken).then(function(session){
      if(!session){
        return null;     
      }else if(sessionsProv.isExpired(session)){
        return null;     
      }
      else{
        return models.users.findById(session.user_id);
      }
    }).then(function(user){
      if(user){
        req.user = user;
        req.sessionToken = sessionToken;
        return sessionsProv.refresh(sessionToken);
      }

      return null;

    }).then(function(results){

      return next();

    }).catch(function(error){
      return next(error);
    });
  }else{
    return next();
  }
}


module.exports = sessionsMiddleware;