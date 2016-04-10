var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Post = mongoose.model('Post'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
    flash = require('connect-flash');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/home', function(req, res){

  if(req.user && req.user.verificationToken == true){ 
  res.render('post',{User:req.user});
  }

  else{
    res.send('not authh');
  }

 });


router.get('/post', function(req, res){

  if(req.user){ 
  res.render('postonjoftim');
  }

  else{
    res.send('not authh');
  }

 });