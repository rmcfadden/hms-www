var request = require('supertest'),
  should = require('should'),
  app = require('../../app');  
 
describe('GET /api/countries', function(){
  it('respond with valid json', function(done){
    request(app)
      .get('/api/countries')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function(res) {
        console.log('RSEPONSE');
        console.log(res);
      })
      .expect(200, done);
  })
})