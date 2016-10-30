var pjson = require('../../package.json');

var expressAssets  = function(){
  var defaults = {
    appVersion : "unknown"
  };

  var _options = {};

  var methods = {};
  methods.initialize = function(options){
    return function(req, res, next) {
    
      if(!res.locals.scripts){
        res.locals.scripts = '';
      }

      if(!res.locals.stylesheets){
        res.locals.stylesheets = '';
      }

      if(!res.locals.resources){
        res.locals.resources = '';
      }

      res.expressAssets = {};
      res.expressAssets.options = _options;  // TODO: merge defaults here

      next();
    }  
  }


  methods.scripts = function(scripts, options){
    return function(req, res, next) {      
      var scriptsText = '';
      for (var i in scripts){
	      scriptsText += '<script type="text/javascript" src="' + applyVersion(req, scripts[i]) + '"></script>\n';
      }
      res.locals.scripts = scriptsText;
      next();
    }
  }  


  methods.stylesheets = function(stylesheets, options){
    return function(req, res, next) {
      var stylesheetsText = '';
      for (var i in stylesheets){
	      stylesheetsText += '<link rel="stylesheet" href="' + applyVersion(req, stylesheets[i]) + '">\n';
      }
      res.locals.stylesheets = stylesheetsText;
      next();
    }
  }  

  function applyOptions(options){

  }


  function applyVersion(req, url){
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




module.exports = new expressAssets();
