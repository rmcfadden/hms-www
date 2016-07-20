var request = require('supertest'),
  should = require('should'),
  app = require('../../app');


describe('POST /api/login', function(){
  it('respond with valid json', function(done){
    request(app)
      .post('/api/login')
      .send("username=etst&password=adsf")
      .expect(302)
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .end(function(err, res){
        if (err) return done(err);
        console.log(res.body);
        done();
      });    
  })
});