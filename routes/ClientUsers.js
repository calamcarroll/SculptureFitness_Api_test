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


module.exports = router;




