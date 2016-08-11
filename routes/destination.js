var express = require('express');
var router = express.Router();

var assets = require('../modules/express-assets')({name: 'testing'});


var destinationsProv = new (require('../modules/destinations-provider'));

router.get('/destination/:iso_code2/:name', 
  assets.scripts(['/assets/js/views/destination.js'] ), 
  function(req, res, next) {
  destinationsProv.findOneByIsoCode2AndName(req.params.iso_code2, req.params.name).then(function(destination){    
    if(destination){
      res.render('destination', { destination : destination});
    }else{
      // TODO: note found
    }
  })
});

module.exports = router;
