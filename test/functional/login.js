var request = require('supertest'),
  should = require('should'),
  app = require('../../app'),
  usersProvider  = require('../../modules/users-provider'),
  randomstring = require("randomstring");

var usersProv = new usersProvider(); 

describe('POST /api/login with a missing email', function(){
  it('respond with a 422 code and a false status ', function(done){
    request(app)
      .post('/api/login')
      .send("password=adsf")
      .expect(422)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res){
        if (err) return done(err);

        res.body.success.should.be.false();
        res.body.message.should.not.be.null();

        done();
      });    
  })
});


describe('POST /api/login with a missing password', function(){
  it('respond with a 422 code and a false status ', function(done){
    request(app)
      .post('/api/login')
      .send("email=adsf")
      .expect(422)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res){
        if (err) return done(err);

        res.body.success.should.be.false();
        res.body.message.should.not.be.null();

        done();
      });    
  })
});


describe('POST /api/login with a valid email but bad password', function(){
  var tempUser = null;
  beforeEach(function(done) { 
    var email = randomstring.generate() + "@test.com";
    var username = "john" + randomstring.generate();

    usersProv.create({ email: email, username: username, password: "123"}).then(function(user){
      tempUser = user;
      done(); 
    }).catch(function(err){
      done(err);
    });
  });
  afterEach(function(done) {
    usersProv.remove(tempUser).then(function(result){
      done(); 
    }).catch(function(err){
      done(err)
    });
  });

  it('respond with a 401 code and a false status ', function(done){
    request(app)
      .post('/api/login')
      .send("email=" + tempUser.email + "&password=adsf")
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


describe('POST /api/login with a valid email and valid password', function(){
  var tempUser = null;
  beforeEach(function(done) { 
    var email = randomstring.generate() + "@test.com";
    var username = "john" + randomstring.generate();

    usersProv.create({ email: email, username: username, password: "123"}).then(function(user){
      tempUser = user;
      done(); 
    }).catch(function(err){
      done(err)
    });
  });


  it('respond with a 200 code and a true status ', function(done){ 
    request(app)
      .post('/api/login')
      .send("email=" + tempUser.email + "&password=123")
      .expect(200)
      .expect('set-cookie', /session-token/)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res){
        if (err) return done(err);

        res.body.success.should.be.true();
        res.body.token.should.not.be.null();
        done();
      });    
  })
});