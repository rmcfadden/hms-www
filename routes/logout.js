var express = require('express');
var router = express.Router();

var sessionsProv  = new (require('../modules/sessions-provider'));

router.post('/api/logout', function(req, res){
  if(req.sessionToken){
		  sessionsProv.expire(req.sessionToken).then(function (rows) { 
      	res.clearCookie('session-token');  
    		return res.send({ success : true });

		  });  
  }
  else{
    return res.send({ success : true });
  }

});

module.exports = router;