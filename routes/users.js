var express = require('express');
var router = express.Router();


router.get('/api/users/me', function(req, res, next) {

  res.setHeader('Content-Type', 'application/json');


  if(req.me){
    res.json(req.me);
    return res.end();
  }else{
    res.status(401);
    res.json({ success: false, message: "user is not authenticated"});
    return res.end();
  }
});

module.exports = router;
