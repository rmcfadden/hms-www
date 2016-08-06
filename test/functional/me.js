require('rootpath')();

var request = require('supertest'),
  should = require('should'),
  app = require('app'),
  usersProvider  = require('modules/users-provider'),
  randomstring = require("randomstring"),
  session = require('supertest-session');

var usersProv = new usersProvider(); 

describe('POST /api/login and /api/users/me should return valid data', function(){
  var tempUser = null;
  var agent  = null;
  beforeEach(function(done) { 
    agent = session(app);

    var email = randomstring.generate() + "@test1.com";
    var username = "john1" + randomstring.generate();

    usersProv.create({ email: email, username: username, password: "123"}).then(function(user){
      tempUser = user;
      done(); 
    }).catch(function(err){
      done(err);
    });
  });

  it('respond with a 200 code and a true status ', function(done){     
    agent
      .post('/api/login')
      .send("username=" + tempUser.username + "&password=123")
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect('set-cookie', /connect.sid/)
      .end(function(err, res){

        if (err) return done(err);

        res.body.success.should.be.true();
        res.body.token.should.not.be.null();

        agent
          .get('/api/users/me')
          .expect(200)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .end(function(err, res){
            if (err) return done(err);
            done();
        });    

      });    
  })
});