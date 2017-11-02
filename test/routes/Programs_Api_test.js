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
                    expect(res.body.length).to.eql(10);
                    done();
                });
              });
        it('should return one program', function (done) {
            chai.request(server)
                .get('/programs/59e7883b97c2090634e3853e')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.eql(1);
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

    describe('POST /Programs', function () {
        it('should return confirmation message and add a program', function(done) {
            var programs = {
                MuscleType: 'Chest' ,
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

    describe.only('PUT /Programs/:id/Weight', function () {
        it('should display a message when weight has been added to program', function(done) {
            chai.request(server)
                .put('/Programs/59e7883b97c2090634e3853e/Weight')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    // expect(res.body).to.be.a('message');
                    expect(res.body).to.have.property('message').equal('Weight incremented by 2kg!' ) ;
                    done();
                });
        });
        it('should return a 404 status and message for invalid program ID', function(done) {
            chai.request(server)
                .put('/Programs/59e7883b97c2090/Weight')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').equal('Invalid Program Id!' ) ;
                    done();
                });
        });

    });
});






