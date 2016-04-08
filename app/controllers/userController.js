var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {
  app.use('/', router);
};


router.post('/student/create',function(req,res){



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

});



router.get('/list', function(req, res){


  User.find(function(err,users){

    if(err)
      res.send(err);

    res.send(users);

 });

});
