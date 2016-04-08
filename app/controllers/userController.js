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



 router.post('/student/create', passport.authenticate('register', {
    successRedirect: '/list',
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


router.get('/home', function(req, res){

  res.render('post');

 });
