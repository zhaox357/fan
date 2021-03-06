var express = require('express');
var router = express.Router();

// use Passport to handle user login
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.'});
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.'});
      }
      return done(null, user);
    });
  }
));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express!', title2: 'title2' });
});

//router.post('/', function(req, res, next) {
//  res.render('login', { title: 'Express!', title2: 'title2' });
//});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true})
);

module.exports = router;
