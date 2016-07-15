# mmh-www
The official Mr and Mrs Honeymoon developer information page.

[![Build Status](https://travis-ci.org/rmcfadden/mmh-www.svg?branch=master)](https://travis-ci.org/rmcfadden/mmh-www)

#One time developer install on Ubuntu (Beta)
1. Clone project from github
 ```
 git clone https://github.com/rmcfadden/mmh-www.git
 ```
2. Install NodeJs and dependencies
  * Enter mmh-www/setup and run
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

4. Create mmh databases and logins (note this may need to be done manaully if done before)
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
 * NOTE: that config/config.json should be populated with passwords which should current mysql passwords.  Use mysql client to verify and adjust if necessary.
6. Update migrate and test
 ```
 sudo npm install
 npm run-script migrate
 npm test
 ```
 
7. Run and test in http://localhost:8080/
 ```
 npm start
 ```


# Development best practices
* Create feature branches that reference Trello cards.
* Write tests
* Test layout on mobile/tablet/desktop
* Use Unify controls:

