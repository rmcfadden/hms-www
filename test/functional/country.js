var request = require('supertest'),
  should = require('should'),
  app = require('../../app');  
 
describe('GET /api/countries', function(){
  it('respond with valid json', function(done){
    request(app)
      .get('/api/countries')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        res.body.length.should.equal(266);
        done();
      });
  })
});