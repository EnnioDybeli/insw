var express       = require('express'),
    router        = express.Router(),
    mongoose      = require('mongoose'),
    User          = mongoose.model('User'),
    LocalStrategy = require('passport-local').Strategy,
    flash         = require('express-flash'),
    passport      = require('passport'),
    bcrypt        = require('bcrypt-nodejs'),
    randtoken     = require('rand-token');


module.exports = function (app) {
  app.use('/', router);
};


//regex email validation
var fshnEmail = function (email) {

        var studentRe = /\w+\.\w+@fshnstudent\.info/,
            profesorRe = /\w+\.\w+@fshn\.edu\.al/;

        if (studentRe.exec(email)) {
            return 'student';
        }
        if (profesorRe.exec(email)) {
            return 'profesor';
        }
        return false;
    };


passport.serializeUser(function (user, done) {
      done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use('login', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'email',
    passwordField: 'password'
},
    function (req, email, password, done) {
    User.findOne({ 'email' :  email },
            function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    console.log('User Not Found with username ' + email);
                    return done(null, false, req.flash('error','Invalid Email'));
                }
                if (!user.validPassword(password) || user.authenticated === false) {

                    console.log('Invalid Password or not activated');
                    return done(null, false,req.flash('error','Invalid password or not profile authenticated'));
                }
                return done(null, user);
            });
    }));


passport.use('register', new LocalStrategy({
    passReqToCallback : true,
    usernameField: 'email',
    passwordField: 'password'
},
    function (req, email, password, done) {
        findOrCreateUser = function () {
            User.findOne({'email': email}, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (user) {
                    console.log('User already exists');
                    return done(null, false, {message: "This user already exists"});
                }
                if (req.body.password === req.body.repassword  && fshnEmail(email) !== false) {
                    var student = new User();
                    student.name = req.body.name;
                    student.surname = req.body.surname;
                    student.email = req.body.email;
                    student.password = student.generateHash(req.body.password);
                    student.number = req.body.number;
                    student.year = req.body.year;
                    student.group = req.body.group;
                    student.verificationToken = randtoken.generate('16');
                    if (fshnEmail(email) === "profesor") {
                        student.admin = true;
                    }
                    student.save(function (err) {
                        if (err) {
                            res.send(err);
                        }
                        var activationURL = 'Kliko ne linkun e meposhtem dhe logohuni per tu verifikuar si user i meteor <br>  http://insw.herokuapp.com/email-verification/' + student.verificationToken,
                            sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
                        sendgrid.send({
                            to:        student.email,
                            from:     'app49273626@heroku.com',
                            subject:  'MeteorCMS Verification - No Reply',
                            text:      activationURL
                        }, function (err, json) {
                            if (err) {
                                return console.error(err);
                            }
                            console.log(json);
                        });
                        return done(null, student, req.flash('error','Kontrollo '+student.email+" per te verifikuar llogarine"));
                    });
                } else {
                    return done(null, false, req.flash('registerError','Passorded duhet te jene te njejte'));
                }
            });
        };
        // Delay the execution of findOrCreateUser and execute
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    }));
