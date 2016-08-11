//http://stackoverflow.com/questions/12737148/creating-a-expressjs-middleware-that-accepts-parameters

var authorization = module.exports = function(){

};

authorization.isInRole = function(role){
  return isInRoles([role]);
};

authorization.isInRoles = function(roles){
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