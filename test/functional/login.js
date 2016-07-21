var request = require('supertest'),
  should = require('should'),
  app = require('../../app');


describe('POST /api/login with a missing username', function(){
  it('respond with a 401 code and a false status ', function(done){
    request(app)
      .post('/api/login')
      .send("username=12312SDFDs&password=adsf")
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res){
        if (err) return done(err);

        res.body.success.should.be.false();
        res.body.message.should.not.be.null();

        done();
      });    
  })
});


describe('POST /api/login with a valid username but bad password', function(){
  it('respond with a 401 code and a false status ', function(done){
    request(app)
      .post('/api/login')
      .send("username=12312SDFDs&password=adsf")
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res){
        if (err) return done(err);

        res.body.success.should.be.false();
        res.body.message.should.not.be.null();

        done();
      });    
  })
});