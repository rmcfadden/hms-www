//http://stackoverflow.com/questions/12737148/creating-a-expressjs-middleware-that-accepts-parameters

var authorization = function(){

};

authorization.isInRole = function(role){
  return isInRoles([role]);
};

authorization.isInRoles = function(roles){
  return false;
};

module.exports = authorization;