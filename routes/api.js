//==================== IMPORTS====================//
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/User");
var News = require("../models/News");
var multer = require('multer');
var fs = require('fs');
var sanitize = require('mongo-sanitize');
//==================== FILE INPUT VALIDATOR ====================//
var MAGIC_NUMBER = {
  pdf: '25504446'
}
function checkMagicNumbers(magic) {
  if (magic == MAGIC_NUMBER.pdf)
    return true;
}
//==================== GET TOKEN ====================//
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
//==================== SETUP MULTER FOR DISK STORAGE ====================//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single('file');
//==================== ROUTE TO POST SIGNUP ====================//
router.post('/signup', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass username and password.' });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.' });
      }
      res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
});
//==================== ROUTE TO POST SIGNIN ====================//
router.post('/RK5uqFWEa0nzJ7qGhDrs', function (req, res) {
  var cleanUser = sanitize(req.body.username);
  var cleanPass = sanitize(req.body.password);
  User.findOne({
    username: cleanUser
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      user.comparePassword(cleanPass, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user.toJSON(), config.secret);
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});
//==================== ROUTE TO POST NEWS ====================//
router.post('/news', passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    upload(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(422).send("an Error occured")
      }
      if (req.file) {
        var bitmap = fs.readFileSync('./uploads/' + req.file.filename).toString('hex', 0, 4);
        if (checkMagicNumbers(bitmap)) {
          var newNews = new News;
          newNews.date = req.body.date;
          newNews.title = req.body.title;
          newNews.description = req.body.description;
          newNews.file = req.file.path;

          newNews.save(function (err) {
            if (err) {
              console.log(err);
              return res.json({ success: false, msg: 'Save news failed.' });
            }
            res.json({ success: true, msg: 'Successful created new news.' });
          });
        } else {
          fs.unlinkSync('./uploads/' + req.file.filename);
          return res.json({ success: true, msg: 'NOT PDF' });
        }

      } else {
        var newNews = new News;
        newNews.date = req.body.date;
        newNews.title = req.body.title;
        newNews.description = req.body.description;
        newNews.file = 'No Attachments';
        newNews.save(function (err) {
          if (err) {
            console.log(err);
            return res.json({ success: false, msg: 'Save news failed.' });
          }
          res.json({ success: true, msg: 'Successful created new news.' });
        });
      }
    });
  }
});
//==================== ROUTE TO POST FORGOT ====================//
router.post('/forgot', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user.toJSON(), config.secret);
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
});
//==================== ROUTE TO POST RESET ====================//
router.post('/reset', passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  console.log(token);
  if (token) {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      mongoose.connection.collections['users'].drop(function (err) {
        console.log('collection dropped');
      });
      newUser.save(function (err) {
        res.json({ success: true, msg: 'Successful created new user.' });
      });
    }
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});
//==================== ROUTE TO GET NEWS ====================//
router.get('/news', passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    News.find({}).sort({ date: -1 }).exec(function (err, news) {
      if (err) return next(err);
      res.json(news);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'no.' });
  }
});
//==================== ROUTE TO GET NEWSFEEDS ====================//
router.get('/newsfeeds', function (req, res) {
  console.log('data asked');
  News.find({}).sort({ date: -1 }).exec(function (err, news) {
    if (err) return next(err);
    res.json(news);
  });

});
//==================== ROUTE TO GET NEWS DETAILS ====================//
router.get('/news/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    News.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});
//==================== ROUTE TO GET LTEST NEWS ====================//
router.get('/modal/:id', function (req, res, next) {
  News.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//==================== ROUTE TO GET FILE PATH ====================//
router.get('/modall/:id', function (req, res, next) {
  News.findById(req.params.id, function (err, news) {
    if (err) console.log(err);
    res.json(news.file);
  });
});
//==================== ROUTE TO DELETE NEWS ====================//
router.delete('/news/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    News.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});
router.put('/news/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    News.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
});
//==================== EXPORT ROUTER ====================//
module.exports = router;
