var express = require('express');
var router = express.Router();


router.get('/api/users/me', function(req, res, next) {
  
  res.setHeader('Content-Type', 'application/json');

  if(req.me){
    res.json(req.me);
    res.end();
  }else{
    res.json({ message: "user is not authenticated"});
    res.end();
  }
});

module.exports = router;
