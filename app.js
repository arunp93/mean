var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var session = require('express-session');
var flash = require('express-flash');
var nodemailer = require('nodemailer');

var api = require('./routes/api');
var app = express();
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
app.use(passport.initialize());
console.log('passport succesful');
app.use(logger('dev'));
console.log('logger succesful');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(session({ secret: 'session secret key' }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
console.log('success');
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/home', express.static(path.join(__dirname, 'dist')));
app.use('/about', express.static(path.join(__dirname, 'dist')));
app.use('/contact', express.static(path.join(__dirname, 'dist')));
app.use('/gallery', express.static(path.join(__dirname, 'dist')));
app.use('/52CifiEDhptF5dde3jOq', express.static(path.join(__dirname, 'dist')));
// app.use('/news', express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json('error');
});
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = app;
