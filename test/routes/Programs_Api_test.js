var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash' );

describe('Programs', function (){

       describe('GET /programs', function () {
           it('should return all the programs', function (done) {
               chai.request(server)
                   .get('/programs')
                   .end(function (err, res) {
                       expect(res).to.have.status(200);
                       expect(res.body).to.be.a('array');
                       // expect(res.body.length).to.equal(4);
                       var result = _.map(res.body,function (program) {
                           return {id: program.id,
                               ExerciseName: program.ExerciseName,
                               MuscleType:program.MuscleType,
                               Sets: program.Sets,
                               Reps: program.Reps,
                               RestTime: program.RestTime,
                               Weight: program.Weight}
                       });
                       expect(result).to.include({
                           "_id": "59e7883b97c2090634e3853e",
                               "Weight": 42,
                               "RestTime": 1,
                               "Reps": 15,
                               "Sets": 4,
                               "ExerciseName": "Romanian Deadlifts",
                               "MuscleType": "Legs",
                               "__v": 0
                       });
                       expect(result).to.include({
                           "_id": "59e7887a97c2090634e38540",
                           "Weight": 40,
                           "RestTime": 2,
                           "Reps": 15,
                           "Sets": 4,
                           "ExerciseName": "Lunges",
                           "MuscleType": "Legs",
                           "__v": 0
                       })

                       done();
                   });
           });
       });



  });

