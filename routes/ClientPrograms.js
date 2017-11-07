var Program = require('../models/Programs');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.Promise = require('bluebird')



// Database connection code
mongoose.connect('mongodb://localhost:27017/programsdb', { useMongoClient: true });

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function (){
    console.log('Connected to programsdb');
});


router.findAllPrograms = function(req, res){
    Program.find(function(err,Programs) {
        if (err)
            res.send(err);
          else
        res.json(Programs);
    });
};

router.findOneProgram = function(req, res) {

    Program.find({ "_id" : req.params.id },function(err, Program) {
        if (err){
            res.status(404)
            res.json({ message: 'Program NOT Found!', errmsg : err } )
        }

        else
            res.json(Program);

    });
};

router.findByType = function(req, res){

    Program.find({ 'MuscleType' : req.params.MuscleType },function(err, Data) {

            if(err){
                res.status(200)
                res.json({message: 'Muscle Type NOT Found!', errmsg: err});
            }else{
                res.json(Data)
            }


    });
};

router.addProgram = function(req, res) {

    var program = new Program();

    program.MuscleType = req.body.MuscleType;
    program.ExerciseName = req.body.ExerciseName;
    program.Sets = req.body.Sets;
    program.Reps = req.body.Reps;
    program.RestTime = req.body.RestTime;
    program.Weight = req.body.Weight;


    program.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Program Added!', data: program });
    });
};

router.deleteProgram = function(req, res) {
    Program.findByIdAndRemove(req.params.id, function(err) {
        if (err){
            res.status(404);
            res.json({ message: 'Program not deleted!'});
        }
        else
            res.json({ message: 'Program Deleted!'});
    });
};

router.clearAllPrograms = function(req, res){
    Program.remove(function(err){
        if(err){
            console.log(err);
        }else{
            res.json({ message: 'All Programs Deleted!'});
        }
    });
}

router.incrementWeight = function(req, res) {

    Program.findById(req.params.id, function(err,program) {
        if (err){
            res.status(404);
            res.json({ message: 'Invalid Program Id!'});
        }else {
            program.Weight += 2;
            program.save(function (err) {
                if (err)
                {
                    res.status(404);
                    res.json({ message: 'Invalid Program Id!'});
                }else
                    res.json({ message: 'Weight incremented by 2kg!', data: program });
            });}
    });
}

router.updateProgram = function(req,res) {

    Program.findById(req.params.id, function(err,program) {
        if (err)
            res.send(err);
        else {
            program.MuscleType = req.body.MuscleType;
            program.ExerciseName = req.body.ExerciseName;
            program.Sets = req.body.Sets;
            program.Reps = req.body.Reps;
            program.RestTime = req.body.RestTime;
            program.Weight = req.body.Weight;

            program.save(function (err) {
                if (err) {
                    res.status(404);
                    res.json({message: 'Invalid Program Id!'});
                }
                else
                    res.json({ message: 'Program has been updated', data: program });
            });
        }
    });

}


module.exports = router;