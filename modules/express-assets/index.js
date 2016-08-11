var pjson = require('../../package.json');

var expressAssets  = function(options){
  var defaults = {
    appVersion : "unknown"
  };

  var _options = {};

  var methods = {};
  methods.initialize = function(){
    return function(req, res, next) {
    
      if(!res.locals.scripts){
        res.locals.scripts = '';
      }

      if(!res.locals.styleSheets){
        res.locals.styleSheets = '';
      }

      res.expressAssets = {};
      res.expressAssets.options = _options;

      next();
    }  
  }


  methods.scripts = function(scripts){
    return function(req, res, next) {
      
      var scriptsText = '';
      for (var i in scripts){
	      scriptsText += '<script type="text/javascript" src="' + applyVersion(req, scripts[i]) + '"></script>';
      }
      res.locals.scripts = scriptsText;
      next();
    }
  }  


  methods.stylesheets = function(styleSheets){
    return function(req, res, next) {
      
      var styleSheetsText = '';
      for (var i in styleSheets){
	      styleSheetsText += '<link rel="stylesheet" href="' + applyVersion(req, styleSheets[i]) + '">';
      }

      res.locals.styleSheets = styleSheetsText;
      next();
    }
  }  

  function applyOptions(options){

  }


  function applyVersion(req, url){

    console.log("defaults");
    console.log(req.expressAssets);

    if(url.indexOf('?') > -1){
      url += "&app_version=" + pjson.version
    }
    else{
      url += "?app_version=" + pjson.version      
    }
    return url;
  }

  return methods;
};




module.exports = expressAssets;
