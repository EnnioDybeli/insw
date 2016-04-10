var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require('passport'),
    flash = require('connect-flash'),
    nev = require('email-verification');


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





router.get('/email-verification/:URL', function(req, res) {
  var url = req.params.URL;

  nev.confirmTempUser(url, function(err, user) {
    if (user) {
      nev.sendConfirmationEmail(user.email, function(err, info) {
        if (err) {
          return res.status(404).send('ERROR: sending confirmation email FAILED');
        }
        res.json({
          msg: 'CONFIRMED!',
          info: info
        });
      });
    } else {
      return res.status(404).send('ERROR: confirming temp user FAILED');
    }
  });
});