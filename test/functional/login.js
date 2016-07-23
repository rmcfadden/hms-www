var request = require('supertest'),
  should = require('should'),
  app = require('../../app'),
  usersProvider  = require('../../modules/users-provider'),
  randomstring = require("randomstring");

var usersProv = new usersProvider(); 

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
  var tempUser = null;
  beforeEach(function(done) { 
    var email = randomstring.generate() + "@test.com";
    var username = "john" + randomstring.generate();

    usersProv.create({ email: email, username: username, password: "123"}).then(function(user){
      tempUser = user;
      done(); 
    }).catch(function(err){
      should.fail();
    });
  });
  afterEach(function(done) {
    usersProv.remove(tempUser).then(function(result){
      done(); 
    }).catch(function(err){
      should.fail();
    });
  });
  it('respond with a 401 code and a false status ', function(done){
  
    request(app)
      .post('/api/login')
      .send("username=" + tempUser.username + "&password=adsf")
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


describe('POST /api/login with a valid username and valid password', function(){
  var tempUser = null;
  beforeEach(function(done) { 
    var email = randomstring.generate() + "@test.com";
    var username = "john" + randomstring.generate();

    usersProv.create({ email: email, username: username, password: "123"}).then(function(user){
      tempUser = user;
      done(); 
    }).catch(function(err){
      should.fail();
    });
  });
  afterEach(function(done) {
    usersProv.remove(tempUser).then(function(result){
      done(); 
    }).catch(function(err){
      should.fail();
    });
  });

  it('respond with a 200 code and a true status ', function(done){ 
    request(app)
      .post('/api/login')
      .send("username=" + tempUser.username + "&password=123")
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res){
        if (err) return done(err);

        res.body.success.should.be.true();
        res.body.sessionKey.should.not.be.null();

        done();
      });    
  })
});