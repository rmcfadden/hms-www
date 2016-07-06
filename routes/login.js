var express = require('express');
var router = express.Router();

var passport = require('passport');


router.post('/api/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/users/' + req.user.username);  
    res.redirect('/');
  });

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;