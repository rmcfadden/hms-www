var expressAssets  = function(options){
  console.log("OPTIONS" + options.name);

  var methods = {};
  
  methods.scripts = function(scripts){
    return function(req, res, next) {
      
      var app_version = req.app.locals.app_version; 

      var scriptsText = '';
      for (var i in scripts){
	      scriptsText += '<script type="text/javascript" src="' + scripts[i] + '"></script>';
      }

      res.locals.scripts = scriptsText;

      next();
    }
  }  

  return methods;
};




module.exports = expressAssets;
