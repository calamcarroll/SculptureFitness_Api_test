var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;


chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash' );

describe('Programs', function (){


    describe('POST /Programs', function () {
        it('should return confirmation message and add a program', function(done) {
            var programs = {
                _id: '5a004b61966d1805fc9f92d0',
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


    describe('GET /programs', function () {
        it('should return all the programs', function (done) {
            chai.request(server)
                .get('/programs')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.not.eql(0);// this value has to be incremented every time a test is run.
                    done();
                });
              });
        it('should return one program', function (done) {
            chai.request(server)
                .get('/programs/5a004b61966d1805fc9f92d0')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.eql(1);
                    done();
                });
             });
        it('should return programs related to that muscle type', function (done) {
            chai.request(server)
                .get('/programs/id/Back')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.eql(2);
                    done();
                });
              });
    });



    describe('PUT /Programs/:id/Weight', function () {
        it('should display a message when weight has been added to program', function(done) {
            chai.request(server)
                .put('/Programs/5a004b61966d1805fc9f92d0/Weight')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    // expect(res.body).to.be.a('message');
                    expect(res.body).to.have.property('message').equal('Weight incremented by 2kg!' ) ;
                    done();
                });
        });
        it('should return a 404 status and message for invalid program ID', function(done) {
            chai.request(server)
                .put('/Programs/5a004a0f7571632e24e1a/Weight')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').equal('Invalid Program Id!' ) ;
                    done();
                });
        });

    });

    describe('PUT /Programs/:id/', function () {
        it('should display a message when the program has been updated', function(done) {

            var programs = {
                MuscleType: 'Legs' ,
                ExerciseName: 'Leg Curl',
                Sets: 4,
                Reps: 8,
                RestTime: 60,
                Weight: 100
            };
            chai.request(server)
                .put('/Programs/5a004b61966d1805fc9f92d0')
                .send(programs)

                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Program has been updated' ) ;
                    done();
                });
        });
    });

    //
    // describe('DELETE/Programs/:id', function () {
    //     it('should delete a program with the ID passed in', function (done) {
    //         chai.request(server)
    //             .delete('/Programs/5a004a0f7571632e24e1aa4e')
    //             .end(function(err, res){
    //                 expect(res).to.have.status(200);
    //                 expect(res.body).to.have.property('message').equal('Program Deleted!' ) ;
    //                 done();
    //             });
    //
    //
    //
    //     })
    // });
    //
    // describe('DELETE/Programs', function () {
    //     it('Clear the collection of all programs', function (done) {
    //         chai.request(server)
    //             .delete('/Programs')
    //             .end(function(err, res){
    //                 expect(res).to.have.status(200);
    //                 expect(res.body).to.have.property('message').equal('All Programs Deleted!' ) ;
    //                 done();
    //             });
    //
    //
    //
    //     })
    // });
});






