'use strict';

var LocalStrategy = require('passport-local').Strategy;
var models  = require('../models');
var usersProvider  = require('../modules/users-provider');
var usersProv = new usersProvider(); 

var sessionsProvider  = require('../modules/sessions-provider');
var sessionsProv = new sessionsProvider(); 

module.exports = function(passport){
  passport.use(new LocalStrategy(
    function(username, password, done) {
      models.user.findOne({ where : { username: username }}).then(function (user) { 
        if (!user) { return done(null, false); }
        if (!usersProv.verifyPassword(user, password)) { return done(null, false); }

        // create a new sesion
        sessionsProv.create(user).then(function(session){
          user.session = session;
          return done(null, user)
        }).catch(function(err){
          return done(err);
        });
      }).catch(function(err){
        return done(err);
      });
    }
  ));


  passport.serializeUser(function(user, done) {
    if(user.session && user.session.token){
      done(null, user.session.token);
    }else{
      done("session not provided in serializeUser");     
    }
  });

  passport.deserializeUser(function(sessionToken, done) {    
    models.session.findOne({where : { token : sessionToken }}).then(function(session){

      if(!session){
        return done("could not find session");
      }

      if(session.is_expired){
        return done("session has expired");
      }

      return models.user.findById(session.user_id);
    }).then(function(user){
      if(!user){
        return done("could not find user");
      }
      else{
        return done(null, user);
      }
    }).
    catch(function(error){
      done("error looking up the session");
    });

  });
}