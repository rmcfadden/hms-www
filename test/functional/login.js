var request = require('supertest'),
  should = require('should'),
  app = require('../../app');
 

describe('POST /login', function(){
  it('respond with valid json', function(done){
    request(app)
      .post('/api/login')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(302, done);
  })
})