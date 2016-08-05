var request = require('supertest'),
  should = require('should'),
  app = require('../../app'),
  testUtils  = require('../../modules/test-utils');


describe('GET /api/destinations', function(){
  before(function(done) {
    this.timeout(15000);
  
    testUtils.ensureDestinationCount(12, function(err, result){
      if(err){
        done(err);
      }
      else{
        done();
      }
    });
  });

  it('should return 12 destinations with count above 11', function(done){
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
   
        // validate that country data is present
        res.body.rows[0].country.id.should.be.greaterThan(0);
        res.body.rows[0].country.iso_code2.should.not.be.null();
        res.body.rows[0].country.fips.should.not.be.null();
        res.body.rows[0].country.name.should.not.be.null();

        done();
      });
  })
});


describe('GET /api/destinations/country/us', function(){
  before(function(done) {
    this.timeout(15000);
  
    testUtils.ensureDestinationCountUs(12, function(err, result){
      if(err){
        done(err);
      }
      else{
        done();
      }
    });
  });

  it('should return 12 destinations with count above 11', function(done){
    request(app)
      .get('/api/destinations/country/us')
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

describe('GET /api/destinations/country/us/?limit=10&offset=0', function(){
  before(function(done) {
    this.timeout(25000);

    testUtils.ensureDestinationCountUs(10, function(err, result){
      if(err){
        done(err);
      }
      else{
        done();
      }
    });
  });

  it('should return 10 destinations from US', function(done){
    request(app)
      .get('/api/destinations/country/us/?limit=10&offset=0')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
      
        res.body.count.should.be.above(9);
        res.body.rows.length.should.be.equal(10);
   
        // validate that country data is present
        res.body.rows[0].country.id.should.be.greaterThan(0);
        res.body.rows[0].country.iso_code2.should.not.be.null();
        res.body.rows[0].country.iso_code2.should.be.equal('US');
        res.body.rows[0].country.fips.should.not.be.null();
        res.body.rows[0].country.name.should.not.be.null();

        done();
      });
  })
});