'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config.json');
var pjson = require('./package.json');
var me  = require('./modules/me');
var sessionsMiddleware  = require('./modules/sessions-middleware');

var app = express();



// Add shared functoins for ejs templates
require('./modules/ejs-shared.js')(app);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));




app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionsMiddleware);
app.use(me.middleware);




app.use('/', require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/signup'));
app.use(require('./routes/login'));
app.use(require('./routes/logout'));
app.use(require('./routes/destinations'));
app.use(require('./routes/destination'));
app.use(require('./routes/countries'));

app.use(require('./routes/admin/index'));


app.locals.app_version = pjson.version;


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var testPort = 3001;
var testServer =  null;
app.startTestServer = function(){
  testServer = this.listen(testPort, function () {
  var port = testServer.address().port;
  console.log('App listening at port %s', testPort);
  });
}

app.closeTestServer = function(){
  testServer.close();
}

// place app locals here
app.locals.scripts  = [];


module.exports = app;
