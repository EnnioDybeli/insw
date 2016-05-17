var express       = require('express'),
    router        = express.Router(),
    mongoose      = require('mongoose'),
    User          = mongoose.model('User'),
    Post          = mongoose.model('Post'),
    LocalStrategy = require('passport-local').Strategy,
    passport      = require('passport'),
    flash         = require('connect-flash');

module.exports = function (app) {
  app.use('/', router);
};

//sign-up
router.post('/student/create', passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register/student',
    failureFlash : true
}));

//sign-in
router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
}));

//verify-user-by-link
router.get('/email-verification/:token', function (req, res) {
    //check for token in database
    User.findOne({'verificationToken': req.params.token}, function (err, user) {
        if (err) {
            res.send(err);
        }
        //authenticate
        user.authenticated = true;
        user.save(function (err) {
            if (err) {
                console.log(err);
            }
            req.flash('error','your account was verified, please log in')
            res.redirect('/');
        });
    });
});

//logut
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



// DEMO ONLY /////////////////////////////////////


// router.get('/list', function(req, res){
//
//   User.find(function(err,users){
//     if(err)
//       res.send(err);
//     res.send(users);
//  });
//
// });
//
//
// router.get('/postlist', function(req, res){
//
//   Post.find(function(err,posts){
//     if(err)
//       res.send(err);
//     res.send(posts);
//  });
//
// });
