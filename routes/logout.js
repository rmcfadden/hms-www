var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res){
  req.logout();

  if(req.user){
    
  }

  res.redirect('/');
});

module.exports = router;