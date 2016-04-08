var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('express-flash'),
    passport = require('passport');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

      res.render('homepage');

});


router.get('/register/:usertype', function(req,res){

  var userType = req.params.usertype;

  if( userType == 'student'){ 

  res.render('register',{
    showtype:'student'
  });

  }

  else if( userType == 'profesor'){ 

  res.render('register',{
    showtype:'profesor'
  });

  }

  else{
  res.render('error');
  }

});





