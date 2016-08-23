var express      =  require('express');
var path         =  require('path');
var favicon      =  require('serve-favicon');
var logger       =  require('morgan');
var cookieParser =  require('cookie-parser');
var bodyParser   =  require('body-parser');
var flash        =  require('connect-flash');
var passport     =  require('passport');
var session      =  require('express-session')
var pgSession    =  require('connect-pg-simple')(session);
var ejs          =  require('ejs');
var engine       =  require('ejs-mate');
var routes       =  require('./routes/index');
var app          =  express();
var secret       =  require('./config/secret');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
require('./config/passport');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new pgSession({
    conString : secret.DB_URL, // Connect using something else than default DATABASE_URL env variable 
  }),
  secret            : secret.secretKey,
  resave            : true,
  saveUninitialized : true, 
  cookie            : { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));

/* in this order */
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


/*
   this middleware is used to make the user object accessible
   throughout the whole request / response cycle and it has to be
   defined after app.use(passport.session()) and before we start using
   our routes otherwise it won't work
*/
app.use(function(req, res, next){
  res.locals.user     =  req.user;
  res.locals.messages =  req.flash();
  next();
});

app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err    =  new Error('Not Found');
  err.status =  404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message : err.message,
      error   : err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message : err.message,
    error   : {}
  });
});

// check what format we're sending 
app.use(function (req, res, next) {
  var format =  req.param('format');

  if (format) {
    req.headers.accept = 'application/' + format;
  }
  next();
});

module.exports = app;
