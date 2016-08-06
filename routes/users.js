var express = require('express');
var router = express.Router();

router.get('/api/users/me', function(req, res, next) {
  
  console.log("user")
  console.log(req.user); 
  //console.log(req.headers)

  res.setHeader('Content-Type', 'application/json');
  res.json({});
  res.end();
});

module.exports = router;
