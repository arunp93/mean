var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var session = require('express-session');
var flash = require('express-flash');
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
app.use(express.static(path.join(__dirname, 'dist'),{inde:false}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'),{inde:false}));
app.use('/home', express.static(path.join(__dirname, 'dist'),{inde:false}));
app.use('/about', express.static(path.join(__dirname, 'dist'),{inde:false}));
app.use('/contact', express.static(path.join(__dirname, 'dist'),{inde:false}));
app.use('/gallery', express.static(path.join(__dirname, 'dist'),{inde:false}));
app.use('/52CifiEDhptF5dde3jOq', express.static(path.join(__dirname, 'dist'),{inde:false}));
app.use('/api', api);
//==================== CATCH 404 ====================//
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//==================== ENABLE CORS ====================//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//==================== ERROR HANDLER ====================//
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
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
//==================== EXPORT EXPRESS INSTANCE ====================//
module.exports = app;
