var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
    flash = require('connect-flash');

module.exports = function (app) {
  app.use('/', router);
};



 router.post('/student/create', passport.authenticate('register', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }));



 router.post('/login',passport.authenticate('login',{
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }));


router.get('/list', function(req, res){

  User.find(function(err,users){
    if(err)
      res.send(err);
    res.send(users);
 });

});

