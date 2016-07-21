var LocalStrategy = require('passport-local').Strategy;
var models  = require('../models');

module.exports = function(passport){
  passport.use(new LocalStrategy(
    function(username, password, done) {
      models.user.findOne({ where : { username: username }}).then(function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
}