var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;