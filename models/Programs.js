var mongoose = require('mongoose');

var ProgramSchema = new mongoose.Schema({
    MuscleType: String,
    ExerciseName: String,
    Sets: Number,
    Reps: Number,
    RestTime: Number,
    Weight: Number

});

module.exports = mongoose.model('Program', ProgramSchema);