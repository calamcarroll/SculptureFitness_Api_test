var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;
var User = require('../../models/Users');

chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash');

describe('Users', function () {
    beforeEach(function (done) {
        User.remove({}, function (err) {
            if (err)
                done(err);
            else {
                var userTest1 = new User();

                userTest1._id = "59f1e69dd0ae514f10a24a66";
                userTest1.Username = "Calam Dunn";
                userTest1.fName = "Calam";
                userTest1.lName = "Carroll";
                userTest1.Email = "ccarroll@hotmail.com";
                userTest1.Weight = 156;
                userTest1.Height = 2.07;
                userTest1.BodyFat = 21;

                userTest1.save(function (err) {
                    if (err)
                        console.log(err);
                    else {
                        var userTest2 = new User();

                        userTest2._id = "59f1e69dd0ae514f10a24a88";
                        userTest2.Username = "Calam Dunn";
                        userTest2.fName = "Calam";
                        userTest2.lName = "Carroll";
                        userTest2.Email = "ccarroll@hotmail.com";
                        userTest2.Weight = 156;
                        userTest2.Height = 2.07;
                        userTest2.BodyFat = 21;
                        userTest2.save(function (err) {
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


    describe('POST /Users', function () {
        it('should return confirmation message and add a user', function (done) {
            var users = {
                _id: '5a008484b73e4b2ec8ecda99',
                Username: "jdDoyle",
                fName: "John",
                lName: "Doyle",
                Email: "jDoyle@gmail.com",
                Weight: 140,
                Height: 2.0,
                BodyFat: 23

            };
            chai.request(server)
                .post('/Users')
                .send(users)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('User Added!');
                    done();

                });
        });
    });

    describe('GET /Users', function () {
        it('should return all the users', function (done) {
            chai.request(server)
                .get('/Users')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.not.eql(0);
                    done();
                });
        });
        it('should return one users', function (done) {

            chai.request(server)
                .get('/users/59f1e69dd0ae514f10a24a66')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.eql(1);
                    done();
                });
        });

        it('should error when the users isnt found', function (done) {

            chai.request(server)
                .get('/users/59f1e69dd0')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('User NOT Found!');
                    done();
                });
        });
    });

    describe('PUT /Users/:id/', function () {
        it('should display a message when the user has been updated', function (done) {

            var users = {
                Username: "jDoyle",
                fName: "Joe",
                lName: "Doyle",
                Email: "JDoyle@gmail.com",
                Weight: 130,
                Height: 2.0,
                BodyFat: 20
            };
            chai.request(server)
                .put('/Users/59f1e69dd0ae514f10a24a66')
                .send(users)

                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('User has been updated');
                    done();
                });
        });
    });

    describe('DELETE/Users/:id', function () {
        it('should delete a user with the ID passed in', function (done) {

            chai.request(server)
                .delete('/users/59f1e69dd0ae514f10a24a68')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('User Deleted!');
                    done();
                });

        })
    });

});

