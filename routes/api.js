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
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/uploads/');
	},
	filename: (req, file, cb) => {
    cb(null, file.originalname);
	}
});
var upload = multer({storage: storage}).single('file');
router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});
router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
router.post('/news', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return res.status(422).send("an Error occured")
      }  
     // No error occured.
     console.log(req)
     if(req.file){
       console.log('in file')
    var newNews = new News;
    newNews.date = req.body.date;
    newNews.title = req.body.title;
    newNews.description = req.body.description;
    newNews.file = req.file.path;

    newNews.save(function(err) {
      if (err) {
        console.log(err);
        return res.json({success: false, msg: 'Save news failed.'});
      }
      res.json({success: true, msg: 'Successful created new news.'});
    });
  } else {
    console.log('out file')
    var newNews = new News;
    newNews.date = req.body.date;
    newNews.title = req.body.title;
    newNews.description = req.body.description;
    newNews.save(function(err) {
      if (err) {
        console.log(err);
        return res.json({success: false, msg: 'Save news failed.'});
      }
      res.json({success: true, msg: 'Successful created new news.'});
    });
  }
}); 
}});

router.get('/news', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    News.find(function (err, news) {
      if (err) return next(err);
      res.json(news);
    });
  } else {
    return res.status(403).send({success: false, msg: 'no.'});
  }
});
router.get('/newsfeeds', function(req, res) {
    console.log('data asked');
    News.find(function (err, news) {
      if (err) return next(err);
      res.json(news);
    });
  
});
router.get('/news/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    News.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
router.get('/modal/:id', function(req, res, next) {
    News.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});
router.get('/modall/:id', function(req, res, next) {
  News.findById(req.params.id, function (err, news) {
    if (err) console.log(err);
    res.json(news.file);
  });
});

router.delete('/news/:id',passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
  News.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
} else {
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});
router.put('/news/:id',passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
  News.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
} else {
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});
router.post('/forgot', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
router.post('/reset', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  console.log(token);
  if (token) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      // save the user
      mongoose.connection.collections['users'].drop( function(err) {
        console.log('collection dropped');
    });
      newUser.save(function(err) {
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

module.exports = router;
