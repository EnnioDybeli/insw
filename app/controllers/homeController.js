var express       = require('express'),
    router        = express.Router(),
    mongoose      = require('mongoose'),
    User          = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy,
    flash         = require('express-flash'),
    passport      = require('passport');


module.exports = function (app) {
  app.use('/', router);
};


router.get('/', function (req, res, next) {
    if (req.user && req.user.authenticated === true) {
        res.redirect('/home');
    }
    res.render('homepage', {
        message: req.flash('error')
    });
});


router.get('/register/:usertype', function (req, res) {
    var userType = req.params.usertype;
    if (userType == 'student') {
        res.render('register', {
            showtype: 'student',
            message: req.flash('registerError')
        });
    } else {
        res.render('register', {
            showtype: 'profesor',
            message: req.flash('registerError')
        });
    }
});
