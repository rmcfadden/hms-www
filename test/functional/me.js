require('rootpath')();

var request = require('supertest'),
  should = require('should'),
  app = require('app'),
  usersProv  = new (require('modules/users-provider')),
  randomstring = require("randomstring"),
  session = require('supertest-session'),
  models = require('models');


var organizationName1 = '';
var organizationName2 = '';

var roleName1 = 'admin';
var roleName2 = 'organization_admin';
var username = '';


describe('POST /api/login and /api/users/me', function(){
  var tempUser = null;
  var agent  = null;
  beforeEach(function(done) { 
    agent = session(app);

    organizationName1 = "organization" + randomstring.generate();
    models.organizations.create({name: organizationName1}).then(function(organization){
      organizationName2 = "organization" + randomstring.generate();      
      return models.organizations.create({name: organizationName2});
    }).then(function(organization){
      var email = randomstring.generate() + "@test1.com";
      username = "john1" + randomstring.generate();
      return usersProv.create({ email: email, username: username, password: "123", 
        organizations: [organizationName1, organizationName2], roles: [roleName1, roleName2]});
    }).then(function(user){
      tempUser = user;
      return done();
    }).catch(function(error){
      done(error);
    });
  });

  it('should respond with a 200 code and me information', function(done){     
    agent
      .post('/api/login')
      .send("email=" + tempUser.email+ "&password=123")
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect('set-cookie', /session-token/)
      .end(function(err, res){

        if (err) return done(err);

        res.body.success.should.be.true();
        res.body.token.should.not.be.null();

        agent
          .get('/api/users/me')
          .expect(200)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .end(function(err, res){
            
            console.log(res.text);

            if (err) return done(err);
            
            res.body.user_id.should.be.above(0);       
            res.body.username.should.equal(username);       

            res.body.organizations[0].name.should.match(new RegExp('(^' + organizationName1 + '$)|(^' + organizationName2 + '$)','g'));
            res.body.organizations[0].id.should.be.above(0);
            res.body.organizations[1].name.should.match(new RegExp('(^' + organizationName1 + '$)|(^' + organizationName2 + '$)','g'));
            res.body.organizations[1].id.should.be.above(0);

            res.body.roles[0].name.should.match(new RegExp('(^' + roleName1 + '$)|(^' + roleName2 + '$)','g'));
            res.body.roles[0].id.should.be.above(0);
            res.body.roles[1].name.should.match(new RegExp('(^' + roleName1 + '$)|(^' + roleName2 + '$)','g'));
            res.body.roles[1].id.should.be.above(0);

            done();
        });
      });    
  })
});



describe('GET /api/users/me without a session', function(){

  it('should respond with a 401 code and a false status ', function(done){     
    request(app)
      .get('/api/users/me')
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res){
        if (err) return done(err);

        res.body.success.should.be.false();
        res.body.message.should.equal("user is not authenticated");

        done();
      });  
  });
});


describe('GET /api/users/me with an invalid session', function(){

  it('should respond with a 401 code and a false status ', function(done){     
    request(app)
      .get('/api/users/me')
      .set('cookie', 'session-token=12312321')
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res){
        if (err) return done(err);

        res.body.success.should.be.false();
        res.body.message.should.equal("user is not authenticated");

        done();
      });  
  });
});