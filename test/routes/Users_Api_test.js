var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;


chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash' );

describe('Users', function (){

    beforeEach(function (done){

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


}