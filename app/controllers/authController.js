var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require('passport');

module.exports = function (app) {
  app.use('/', router);
};


// passport/login.js
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, email, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'email' :  email }, 


      function(err, user) {

        // In case of any error, return using the done method
        if (err)
          return done(err);


        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
                req.flash('message', 'User Not found.'));                 
        }


        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){

          console.log('Invalid Password');
          return done(null, false, 
              res.flash('message', 'Invalid Password'));
        }

        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
    }


  );
    
}));







passport.use('register', new LocalStrategy({
    passReqToCallback : true
  },

  function(req, email, password, done) {

    findOrCreateUser = function(){

      // find a user in Mongo with provided username
      User.findOne({'email':email},function(err, user) {

        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }

        // already exists
        if (user) {
          res.send('User already exists');
          console.log('User already exists');
          return done(null, false, res.flash('message','User Already Exists'));
        } 


        else {
          // if there is no user with that email
          // create the user
          var student = new User();

          student.name = req.body.name;
          student.surname = req.body.surname;
          student.email = req.body.email;
          student.password = req.body.password;
          student.number = req.body.number;
          student.year = req.body.year;
          student.group = req.body.group;


          student.save(function(err) {
            if (err)
              res.send(err);
            res.redirect('/list');
          });
        }

      });


    };
     
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);


  }

  )

  );


