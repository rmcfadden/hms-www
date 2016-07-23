var LocalStrategy = require('passport-local').Strategy;
var models  = require('../models');
var usersProvider  = require('../modules/users-provider');

var usersProv = new usersProvider(); 

module.exports = function(passport){
  passport.use(new LocalStrategy(
    function(username, password, done) {
      models.user.findOne({ where : { username: username }}).then(function (user) {
 
        if (!user) { return done(null, false); }
        if (!usersProv.verifyPassword(user, password)) { return done(null, false); }
        
        return done(null, user);
      }).catch(function(err){
        if (err) { return done(err); }
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    models.user.findById(id, function(err, user) {
      done(err, user);
    });
  });
}