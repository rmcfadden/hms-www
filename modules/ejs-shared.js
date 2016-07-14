module.exports = function(app){
  app.locals.truncateWithEllipses = function (txt, n){
    return (txt.length > n) ? txt.substr(0,n-1)+'...' : txt;
  };
}