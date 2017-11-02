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
                    expect(res.body.length).to.eql(2);
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
    });



  });

