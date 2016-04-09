var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('express-flash'),
    passport = require('passport');


var fshnEmail = function(email){

  var studentRe = /\w+\.\w+@fshnstudent\.info/; 
  var profesorRe = /\w+\.\w+@fshn\.edu\.al/;

  if( studentRe.exec(email) || profesorRe.exec(email) ){

    return true;

  }

  else{ 

    return false 
    
  }

};



module.exports = function (app) {
  app.use('/', router);
};




    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });



passport.use('login', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'email',
    passwordField: 'password'
  },
  function(req, email, password, done) { 

    User.findOne({ 'email' :  email }, 


      function(err, user) {

        if (err)
          return done(err);


        if (!user){
          console.log('User Not Found with username '+ email);
          return done(null, false, 
                req.flash('message', 'User Not found.'));                 
        }

        if ( user.password != req.body.password ){

          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }

        return done(null, user);
    }


  );

}));


passport.use('register', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'email',
    passwordField: 'password'
    },

  function(req, email, password, done) {

    findOrCreateUser = function(){

      User.findOne({'email':email},function(err, user) {

        if (err){
          console.log(err);
          return done(err);
        }

        if (user) {
          // res.send('User already exists');
          console.log('User already exists');
          return done(null, false, console.log('User Already Exists'));
        } 


        if( req.body.password == req.body.repassword  && fshnEmail(email) ){

          var student = new User();

          student.name = req.body.name;
          student.surname = req.body.surname;
          student.email = req.body.email;
          student.password = req.body.password;
          student.number = req.body.number;
          student.year = req.body.year;
          student.group = req.body.group;

          console.log(student.name)

          student.save(function(err) {

            if (err)
              res.send(err);

            console.log('User Registration succesful'); 

            return done(null, student);

          });
        }


        else{
          return done(null,false,
            console.log("passwords dont match"));
        }



      });

    };
     
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);


  }

  )

  );
