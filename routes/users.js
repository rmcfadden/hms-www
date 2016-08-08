var express = require('express');
var router = express.Router();

var me  = new (require('../modules/me'));


router.get('/api/users/me', function(req, res, next) {
  
  res.setHeader('Content-Type', 'application/json');

  console.log("req.user");
  console.log(req.user.email);

  if(req.user){

    me.findFromUser(req.user).then(function(me){
      res.json(me);
    }).catch(function(err){
      res.json({success: false, error: err});
    });

  }else{
    res.json({ message: "user is not authenticated"});
  }
  res.end();
});

module.exports = router;
