var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;
var Program = require('../../models/Programs');


chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash');

describe('Programs', function () {

    beforeEach(function (done) {
        Program.remove({}, function (err) {
            if (err)
                done(err);
            else {
                var testProgram1 = new Program();

                testProgram1._id = "59f1e69dd0ae514f10a24a82";
                testProgram1.MuscleType = "Legs";
                testProgram1.ExerciseName = "Leg Press";
                testProgram1.Sets = 5;
                testProgram1.Reps = 5;
                testProgram1.RestTime = 1;
                testProgram1.Weight = 80;

                testProgram1.save(function (err) {
                    if (err)
                        console.log(err);
                    else {
                        var testProgram2 = new Program();

                        testProgram2._id = "59f9fb109bd9dc7f544cadfa";
                        testProgram2.MuscleType = "Legs";
                        testProgram2.ExerciseName = "Squats";
                        testProgram2.Sets = 5;
                        testProgram2.Reps = 5;
                        testProgram2.RestTime = 1;
                        testProgram2.Weight = 100;

                        testProgram2.save(function (err) {
                            if (err)
                                console.log(err)
                            else {
                                done()
                            }
                        })
                    }
                })
            }
        })
    })

    describe('POST /Programs', function () {
        it('should return confirmation message and add a program', function (done) {
            var programs = {
                _id: '5a008484b73e4b2ec8ecda03',
                MuscleType: 'Legs',
                ExerciseName: 'Chest Press',
                Sets: 4,
                Reps: 8,
                RestTime: 60,
                Weight: 100
            };
            chai.request(server)
                .post('/programs')
                .send(programs)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Program Added!');
                    done();
                });
        });
    });

    describe('GET /programs', function () {
        it('should return all the programs', function (done) {
            chai.request(server)
                .get('/programs')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.not.eql(0);
                    done();
                });
        });
        it('should return one program', function (done) {

            chai.request(server)
                .get('/programs/59f1e69dd0ae514f10a24a82')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.eql(1);
                    done();
                });
        });
        it('Should error and return a message if the program is not found', function (done) {

            chai.request(server)
                .get('/programs/59f1e69dd0ae514f1')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').equal('Program NOT Found!');
                    done();
                });
        });

        it('should return programs related to that muscle type', function (done) {
            chai.request(server)
                .get('/programs/id/Legs')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.eql(2);
                    done();
                });
        });


    });


    describe('PUT /Programs/:id/Weight', function () {
        it('should display a message when weight has been added to program', function (done) {
            chai.request(server)
                .put('/Programs/59f1e69dd0ae514f10a24a82/Weight')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    // expect(res.body).to.be.a('message');
                    expect(res.body).to.have.property('message').equal('Weight incremented by 2kg!');
                    done();
                });
        });
        it('should return a 404 status and message for invalid program ID', function (done) {
            chai.request(server)
                .put('/Programs/5a004a0f7571632e24e1a/Weight')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').equal('Invalid Program Id!');
                    done();
                });
        });

    });

    describe('PUT /Programs/:id/', function () {
        it('should display a message when the program has been updated', function (done) {

            var programs = {
                MuscleType: 'Legs',
                ExerciseName: 'Leg Curl',
                Sets: 4,
                Reps: 8,
                RestTime: 60,
                Weight: 100
            };
            chai.request(server)
                .put('/Programs/59f1e69dd0ae514f10a24a82')
                .send(programs)

                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Program has been updated');
                    done();
                });
        });

    });


    describe('DELETE/Programs/:id', function () {
        it('should delete a program with the ID passed in', function (done) {

            chai.request(server)
                .delete('/Programs/59f1e69dd0ae514f10a24a82')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Program Deleted!');
                    done();
                });
        })

        it('should error and display a message when an invalid id is passed in', function (done) {

            chai.request(server)
                .delete('/Programs/59f1e69dd0ae514')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').equal('Program not deleted!');
                    done();
                });
        })
    });

    describe('DELETE/Programs', function () {
        it('Clear the collection of all programs', function (done) {
            chai.request(server)
                .delete('/Programs')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('All Programs Deleted!');
                    done();
                });


        })
    });

});






