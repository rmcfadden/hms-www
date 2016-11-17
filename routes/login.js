var express = require('express');
var router = express.Router();
var models  = require('../models');

var usersProv  = new (require('../modules/users-provider'));
var sessionsProv  = new (require('../modules/sessions-provider'));

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/api/login', function(req, res, next) {

  // TODO: move this to a module
  if(!req.body.email){
    res.status(422);
    res.send({success: false, message: "no email parameter"});
    return res.end();
  }

  if(!req.body.password){
    res.status(422);
    res.send({success: false, message: "no password parameter"});
    return res.end();
  }

  
  models.users.findOne({ where : { email: req.body.email }}).then(function (user) { 
    if (!user) {
      res.status(401);
      res.send({success: false, message: "invalid email or password"});
      return res.end();
    }

    if (!usersProv.verifyPassword(user, req.body.password)) { 
      res.status(401);
      res.send({success: false, message: "invalid email or password"});
      return res.end();
    }

    sessionsProv.create(user).then(function(session){
      var oneMonth =  30 * 24 * 3600 * 1000;
      res.cookie('session-token', session.token, { maxAge: oneMonth, httpOnly: true });  
      return res.send({ success : true, token: session.token});
    }).catch(function(err){      
      res.send({success: false, message: "could not create a session"});
      return res.end();
    });

  }).catch(function(err){
    res.send({success: false, message: "invalid username or password"});
    return res.end();
  });

});


module.exports = router;