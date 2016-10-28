var url = require('url');

var config = require('../config/config.json');
var pageSize = config.pageSize ? config.pageSize : 12;


var pagingMiddleware = function (req, res, next){ 

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  req.paging = {};
  req.paging.offset =  query.offset ? parseInt(query.offset) : 0;
  req.paging.limit =  query.limit ? parseInt(query.limit) : pageSize;

  next();
}



module.exports = pagingMiddleware;