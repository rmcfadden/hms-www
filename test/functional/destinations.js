var request = require('supertest'),
  should = require('should'),
  app = require('../../app'),
  testUtils  = require('../../modules/test-utils');


describe('GET /api/destinations', function(){
  before(function(done) {
    testUtils.addTestDestinations(12);
    done();
  });
  it('should return 12 destinations with count above 10', function(done){
    request(app)
      .get('/api/destinations')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
 
        res.body.count.should.be.above(11);
        res.body.rows.length.should.be.equal(12);
          
        done();
      });
  })
});


describe('GET /api/destinations?offset=2&limit=5', function(){
  it('should return 5 or more destinations', function(done){
    request(app)
      .get('/api/destinations?offset=2&limit=5')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        
        res.body.count.should.be.above(5);
        res.body.rows.length.should.be.equal(5);
   
        done();
      });
  })
});