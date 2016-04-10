var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('express-flash');
var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
var User = mongoose.model('User');



module.exports = function(app, config) {

  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');


  //passport stuff 
  app.use(expressSession({
    secret: 'noizystresibabastars',
    resave:true,
    saveUninitialized: true
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  

//////////////////////////////////////////////////////////////////////////////// NEV CONFIG

nev.configure({
    verificationURL: 'http://localhost:3000/email-verification/${URL}',
    persistentUserModel: User,
    expirationTime: 600,
 
    transportOptions: {
        service: 'Gmail',
        auth: {
            user: 'meteorcms2016@gmail.com',
            pass: 'meteor2016'
        }
    },
    verifyMailOptions: {
        from: 'Do Not Reply <myawesomeemail_do_not_reply@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    }
});


nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('generated temp user model:');
});
 

// using a predefined file 
var TempUser = require('../app/models/user');

nev.configure({
    tempUserModel: TempUser 
});



/////////////////////////////////////////////////////////////////////////////////// end NEV




  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};