var User = require('../models/Users');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;



// Database connection code
mongoose.connect('mongodb://localhost:27017/usersdb', { useMongoClient: true });

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function (){
    console.log('Connected to usersdb');
});


router.getAllUsers = function(req, res){

    User.find(function(err,User) {

        if(err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else

            res.json(User);

    });
};




router.findOneUser = function(req, res) {

    User.find({ "_id" : req.params.id },function(err, Users) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else
            res.json(Users);

    });
};

router.addUser = function(req, res) {

    var user = new User();
    user._id = req.body._id;
    user.Username = req.body.Username;
    user.fName = req.body.fName;
    user.lName = req.body.lName;
    user.Email = req.body.Email;
    user.Weight = req.body.Weight;
    user.Height = req.body.Height;
    user.BodyFat = req.body.BodyFat;

    // console.log('Adding program: ' + JSON.stringify(User));

    user.save(function(err) {
        if (err)
            res.send(err);
        else

            res.json({ message: 'User ' + user.Username+ ' Added!   ', data: user});
    });
};

module.exports = router;




