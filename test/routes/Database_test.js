
var chai = require('chai');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expect = chai.expect;

"use strict";

const testSchema = new Schema({
    ExerciseName: {type: String, required: true},
    MuscleType: {type: String, required: true},
    Sets: {type: Number, required: true},
    Reps: {type: Number, required: true},
    RestTime: {type: Number, required: true},
    Weight: {type: Number, required: true}
});

const Program = mongoose.model('Program', testSchema);

describe('Database Tests', function () {

    before(function (done) {
        mongoose.connect('mongodb://localhost/testDatabase', {useMongoClient: true});
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('Connection successful!');
            done();
        });
    });

    describe('Test Database', function () {

        it('Should save a new program to the database', function (done) {
            var testProgram = Program({
                ExerciseName: 'Squats',
                MuscleType: 'Legs',
                Sets: 4,
                Reps: 6,
                RestTime: 60,
                Weight: 50
            });

            testProgram.save(done);


        });


        it('Should error when a program with the wrong fields is saved to the db', function (done) {
            //Attempt to save with wrong info. An error should trigger
            var wrongProgram = Program({
                ExName: 'Squats',
                MusType: 'Legs',
                Set: 4,
                Rep: 6,
                Rest: 60,
                Weight: 50
            });

            wrongProgram.save(err => {
                if (err) {
                    return done();
                }
                throw new Error('Invalid Program added');
            });
        });
        it('Should retrieve a program from the data base', function (done) {

            Program.find({MuscleType: 'Legs'}, (err, Legs) => {
                if (err) {
                    throw err;
                }
                if (Legs.length === 0) {
                    throw new Error('No data!');
                }
                done();
            });
        });


    });
});