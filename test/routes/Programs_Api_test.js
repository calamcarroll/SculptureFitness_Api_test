var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;
var Program = require('../../models/Programs');


chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash' );

describe('Programs', function (){

    beforeEach(function (done){
        Program.remove({}, function(err){
            if(err)
                done(err);
            else{
                var testProgram1 = new Program();

                testProgram1._id = "59f1e69dd0ae514f10a24a82";
                testProgram1.MuscleType = "Legs";
                testProgram1.ExerciseName = "Leg Press";
                testProgram1.Sets = 5;
                testProgram1.Reps = 5;
                testProgram1.RestTime = 1;
                testProgram1.Weight = 80;

                testProgram1.save(function (err) {
                    if(err)
                        console.log(err);
                    else{
                        var testProgram2 = new Program();

                        testProgram2._id = "59f9fb109bd9dc7f544cadfa";
                        testProgram2.MuscleType = "Legs";
                        testProgram2.ExerciseName = "Squats";
                        testProgram2.Sets = 5;
                        testProgram2.Reps = 5;
                        testProgram2.RestTime = 1;
                        testProgram2.Weight = 100;

                        testProgram2.save(function (err) {
                            if(err)
                                console.log(err)
                            else
                            {
                                done()
                            }
                        })
                    }
                })
            }
        })
    })

    describe('POST /Programs', function () {
        it('should return confirmation message and add a program', function(done) {
            var programs = {
                _id: '5a008484b73e4b2ec8ecda03',
                MuscleType: 'Legs ' ,
                ExerciseName: 'Chest Press',
                Sets: 4,
                Reps: 8,
                RestTime: 60,
                Weight: 100
            };
            chai.request(server)
                .post('/programs')
                .send(programs)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Program Added!' ) ;
                    done();
                });
        });
    });


  
});






