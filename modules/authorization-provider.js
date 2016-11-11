var demandAuth = require('./express-demand-auth');

var authorizationProvider  = function(){
  var defaults = {
    appVersion : "unknown"
  };

  var _options = {};

  var methods = {};
  methods.demandAdmin = function(options){

		return function(req, res, next) {
			var redirectUrl = '/login';

			if(options && options.is_admin == true){
				redirectUrl = '/admin/login';
			}

			if(!req.me){
				return res.redirect(redirectUrl);			
			}

			var roles = req.me.roles;

console.log("ROLES");
console.log(req.me.roles);


			if(demandAuth.isInAnyRoles(roles, ['admin'])){
				return next();
			}
			else{
				return res.redirect(redirectUrl);
			}

			return next();
		}
  }

	return methods;
}

module.exports = new authorizationProvider();