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


//app-home-feed
router.get('/home', function (req, res) {
    if (req.user) {
        //get all posts
        Post.find(function (err, posts) {
            if (err) {
                res.send(err);
            }
            //render professor's view
            if (req.user.admin !== true) {
                res.render('post', {
                    User: req.user,
                    Paralel: req.user.group.slice(0, 1)
                });
            //render students view
            } else {
                res.render('post', {
                    User: req.user
                });
            }
        });
    } else {
        res.redirect('/');
    }
});


//render-posting-form
router.get('/post', function (req, res) {
  if (req.user) {

        //professor's form
        if (req.user.admin !== true) {
            res.render('postonjoftim', {
                User: req.user,
                Paralel: req.user.group.slice(0, 1)
            });

        //student's form
        } else {
            res.render('postonjoftim', {
                User: req.user
            });
        }

    } else {
        res.send('not authorized');
    }
});


//get-post
router.post('/post', function (req, res) {
    if (req.user) {
        //create post
        var njoftim     = new Post();

        //set student post
        if (req.user.admin !== true){
          njoftim.author  = req.user.name + req.user.surname;
          njoftim.title   = req.body.title;
          njoftim.feed    = req.body.feed;
          njoftim.text    = req.body.text;
          njoftim.service = req.body.service;
          njoftim.grupi   = req.user.group;
          njoftim.viti    = req.user.year;
        }

        //set professor post
        if (req.user.admin === true) {

            njoftim.authorType = 'profesor';
            njoftim.author     = req.user.name + req.user.surname;
            njoftim.title      = req.body.title;
            njoftim.text       = req.body.text;
            njoftim.service    = req.body.service;
            njoftim.grupi      = req.body.grupi;
            njoftim.viti       = req.body.viti;

            if (req.body.viti === 'all') {
              njoftim.feed = 'kryesore';
            } else if (req.body.grupi === 'all') {
              njoftim.feed = req.body.grupi.slice(0,1);
            } else {
              njoftim.feed = req.body.grupi;
            }

        }
        // save on db
        njoftim.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.redirect('/home');

            if (req.body.service === 'email' || req.body.service === 'both') {
                User.find(function (err, emails) {
                    var user = 0;
                    //send email to each user
                    for (user in emails) {
                          sendgrid.send({
                            to:        emails[user].email ,
                            from:     'app49273626@heroku.com',
                            subject:  'New post on Fshn',
                            text:     'Postim i ri nga' + njoftim.author + ':' + njoftim.text
                          }, function (err, json) {
                                  if (err) {
                                    return console.error(err);
                                  }
                                  console.log(json);
                             });
                    } //end loop
                  });//close db
            }
        });//save post

    // if not authenticated
    } else {
        res.redirect('/');
    }
});




// AJAX API //

//ajax-feeds
router.get('/ajax/:route', function (req, res) {
    if (req.user) {
        Post.find({'feed': req.params.route}, function (err, posts) {
            res.render('njoftim', {Posts: posts.reverse(), User: req.user});
        });
    } else {
        res.send('not authorized!');
    }
});


//ajax-feed-profesor
router.get('/ajax-filter/:viti/:grupi', function (req, res) {
    if (req.user) {
        Post.find({'viti': req.params.viti,
                   'grupi': req.params.grupi.toUpperCase() },
          function (err, posts) {
              res.render('njoftim', {Posts: posts.reverse(), User: req.user});
          });

    } else {
        res.send('not authorized!');
    }
});


//ajax-posts-from-user
router.get('/user-post/:author', function (req, res) {
    if (req.user) {
        Post.find({'author': req.params.author}, function (err, posts) {
            res.render('post', { Posts: posts, User: req.user});
        });
    } else {
        res.send('not authorized!');
    }
});


router.get('/ajax/delete/:id', function (req, res) {
    if (req.user) {
        Post.remove({'_id': req.params.id}, function (err) {
          if (err) {
            res.send('error - could not find and delete post');
          } else {
            res.send('done');
          }
        });
    } else {
        res.send('not authorized!');
    }
});
