var Program = require('../models/Programs');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;



// Database connection code
mongoose.connect('mongodb://localhost:27017/programsdb', { useMongoClient: true });

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function (){
    console.log('Connected to database');
});


router.findAllPrograms = function(req, res){
    Program.find(function(err,Programs) {
        if (err)
            res.send(err);

        res.json(Programs);
    });
};
//todo take out id field in end point. No need for it to be in
router.findOneProgram = function(req, res) {

    Program.find({ "_id" : req.params.id },function(err, Program) {
        if (err)
            res.json({ message: 'Program NOT Found!', errmsg : err } );
        else
            res.json(Program);

    });
};

router.findByType = function(req, res){

    Program.find({ 'MuscleType' : req.params.MuscleType },function(Err, Data) {
        try{
            res.json(Data)
        }catch(Err){
            res.json({message: 'Muscle Type NOT Found!', errmsg: err});
        }
    });
};
//TODO Fuzzy search function still to be implemented
router.fuzzySearch = function (req, res) {

    // Program.find({$text: {$search: req.params.ExerciseName}})
    //     .skip(20)
    //     .limit(10)// for pagination it skips the first 20 results because its already requested and limits the page to only show 10 results
    //     .exec(function(err, Docs) {
    //         if (err){
    //             res.json({ message: 'Search for exercise name not found with error:', errmsg : err } );
    //         }else if(Docs !== null){
    //             res.json(Program)
    //         }
    //     });

    //TODO Other way to implement fuzzy search
    // var programsWithTag = [];
    // var searchTag = req.params.tags;
    // console.log(searchTag);
    //
    // for(var i = 0; i< Program.length; i++){
    //     var currentTags = Program[i].tags;
    //     console.log(currentTags);
    //     if(currentTags.indexOf(searchTag) !== -1)
    //         programsWithTag.push(Program[i]);
    // }
    // if(programsWithTag.length !== 0)
    //     res.json(programsWithTag);
    // else
    //     res.json({message: "No Programs like this found"})
//TODO THIS PART IS FOR THE MOST RECENT FUZZY SEARCH USING NPM FUZZY IMPORT

    // var list = [Program.find({ "ExerciseName" : req.params.ExerciseName})];
    // var results = fuzzy.filter('req.params.ExerciseName', Program)
    // var matches = results.map(function(el) {
    //
    //     return el.string; });
    // console.log(matches);
};

router.addProgram = function(req, res) {

    var program = new Program();

    program.MuscleType = req.body.MuscleType;
    program.ExerciseName = req.body.ExerciseName;
    program.Sets = req.body.Sets;
    program.Reps = req.body.Reps;
    program.RestTime = req.body.RestTime;
    program.Weight = req.body.Weight;

    console.log('Adding program: ' + JSON.stringify(program));

    program.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Program Added!', data: program });
    });
};

router.deleteProgram = function(req, res) {
    Program.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Program Deleted!'});
    });
};

router.incrementWeight = function(req, res) {

    Program.findById(req.params.id, function(err,program) {
        if (err)
            res.send(err);
        else {
            program.Weight += 2;
            program.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Weight incremented by 2kg!', data: program });
            });
        }
    });
};

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
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Program has been updated', data: program });
            });
        }
    });

}


module.exports = router;