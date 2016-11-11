//http://stackoverflow.com/questions/12737148/creating-a-expressjs-middleware-that-accepts-parameters

var authorization = module.exports = function(){

};

authorization.isInAnyRole = function(role, requiredRoles){
  return authorization.isInAnyRoles([role], requiredRoles);
};

authorization.isInAnyRoles = function(roles, requiredRoles){
  return false;
};

/*
function HasRole(role) {
  return function(req, res, next) {
    if (role !== req.user.role) res.redirect(...);
    else next();
  }
}
*/