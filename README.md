# The official Honeymoon Style project

[![Build Status](https://travis-ci.org/rmcfadden/hms-www.svg?branch=master)](https://travis-ci.org/rmcfadden/hms-www)
[![Coverage Status](https://coveralls.io/repos/github/rmcfadden/hms-www/badge.svg?branch=master)](https://coveralls.io/github/rmcfadden/hms-www?branch=master)


#One time developer install on Ubuntu (Beta)
1. Clone project from github
 ```
 git clone https://github.com/rmcfadden/hms-www.git
 ```
2. Install NodeJs and dependencies
  * Enter hms-www/setup and run
 ```
 ./install
 ```
  * makes sure node -version returns a valid version:
 ```
 sudo node --version
 v4.2.6
 ```

3. Install Mysql (if not already installed)

 * from setup/ run
 ```
 ./mysql_install
 ``` 

4. Create hms databases and logins (note this may need to be done manaully if done before)
 * create passwords file from setup/ 
 ```
 cp  mysql-passwords.sample mysql-passwords
 ``` 
 * edit passwords file and change passwords to whatever you want
 ```
 nano mysql-passwords
 ``` 

 * run mysql_create
 ```
 ./mysql_create
 ``` 
 * NOTE: that config/config.json should be populated with the current mysql passwords.  Use mysql client to verify and adjust if necessary.
6. Update migrate and test
 ```
 sudo npm install
 npm run-script migrate
 npm test
 ```
 
7. Add test data and run and test in http://localhost:8080/
 ```
 ./utils/hms.js --add-test-data 
 npm start
 ```
 
# Current tech stack
* NodeJs for server side development
* MySQL for relational database
* Express for MVC
* Sequelize for ORM
* Mocha for testing
* Supertest for HTTP testing
* Passport for authentication

# Development best practices
* Practice DRY (don't repeat yourself) coding.
* Create feature branches that reference Trello cards. [More info](http://stackoverflow.com/questions/2765421/push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too).   Use this [plugin](http://goo.gl/yKfjV) to show card numbers and reference these numbers in commits.
* Verify CI builds here: https://travis-ci.org/rmcfadden/hms-www
* Write tests.  Aspire for 100% code coverage.  Make sure tests pass:
 ```
 npm test
 ```
* Test layout on mobile/tablet/desktop (will figure out e2e later)
* Use Unify controls: http://htmlstream.com/preview/unify-v1.9.5/shortcode_typo_general.html
* Create sequelize migrations.  Make sure they migrate up and down all the way everytime.
```
npm run-script migrate
npm run-script migrate-undo-all
```
* Avoid callback hell by using [aysnc.waterfall](https://www.npmjs.com/package/async-waterfall) or [promises](https://howtonode.org/promises)
