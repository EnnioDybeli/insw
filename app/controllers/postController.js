var express       = require('express'),
    router        = express.Router(),
    mongoose      = require('mongoose'),
    User          = mongoose.model('User'),
    Post          = mongoose.model('Post'),
    LocalStrategy = require('passport-local').Strategy,
    passport      = require('passport'),
    flash         = require('connect-flash'),
    sendgrid      = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);


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
        Paralel:req.user.group.slice(0,1)
      });

    })
  }
  else{
    res.send('not authh');
  }

 });


router.get('/post', function(req, res){

  if(req.user){

    if(req.user.admin !== true){

      res.render('postonjoftim',{
            User:req.user,
            Paralel:req.user.group.slice(0,1) });

    } else {

      res.render('postonjoftim',{
            User:req.user });
  }

  } else {
    res.send('not authh');
  }

 });



router.post('/post', function(req, res){

  if(req.user){


    var njoftim = new Post();

    njoftim.author = req.user.name + req.user.surname;
    njoftim.title = req.body.title;
    njoftim.feed = req.body.feed;
    njoftim.text = req.body.text;
    njoftim.service = req.body.service;

    njoftim.save(function(err){
      if(err)
        res.send(err);

      res.redirect('/home');

      User.find(function(err,emails){
        // console.log('users::::'+emails)

        for (user in emails){

          sendgrid.send({
            to:        emails[user].email ,
            from:     'app49273626@heroku.com',
            subject:  'New post on Fshn',
            text:     'Postim i ri nga' + njoftim.author + ':' + njoftim.text
          },
          function(err, json) {
            if (err) { return console.error(err); }
            console.log(json);
          });

          // console.log('emails::::'+ emails[user].email);
        }
      });
    });


  } else{
    res.redirect('/');
  }

 });



router.get('/ajax/:route', function(req, res){


  if(req.user){

    Post.find({'feed':req.params.route},function(err,posts){

      res.render('njoftim',{ Posts:posts.reverse(),User:req.user });

    })

  }else{
    res.redirect('/')
  }

 });



router.get('/user-post/:author', function(req, res){


  if(req.user){


    Post.find({'author':req.params.author},function(err,posts){

      res.render('post',{ Posts:posts,User:req.user });

    })

  }else{
    res.redirect('/')
  }

 });
