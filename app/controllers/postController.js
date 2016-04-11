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

  if(req.user){ 

    Post.find(function(err,posts){
      if(err)
        res.send(err);

      res.render('post',{
        User:req.user,
        Posts:posts
      });

    })


  
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



router.post('/post', function(req, res){

  if(req.user){ 


    var njoftim = new Post();

    njoftim.author = req.user.name + " " + req.user.surname;
    njoftim.group = req.body.group;
    njoftim.year = req.body.year;
    njoftim.text = req.body.text;
    njoftim.service = req.body.service;

    njoftim.save(function(err){
      if(err)
        res.send(err);

      res.redirect('/home');

    });
  

  } else{
    res.redirect('/');
  }

 });