let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let db            = require('../db');
let bcrypt        = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.uuid);
});

passport.deserializeUser((uuid, done) => {
  db.select('*').from('person').where('uuid', uuid)
    .then(entries => {
      done(null, entries[0]);
    });
});

passport.use('local-signup', new LocalStrategy(
  {
    usernameField     : 'email',
    passwordField     : 'password',
    passReqToCallback : true,
  },
  async (req, email, password, done) => {
    let entries = await db.select('*').from('person').where('email', email);

    if (entries.length > 0) { return done(null, false); }


  }
));

passport.use('local-login',
  new LocalStrategy({
    usernameField     : 'email',
    passwordField     : 'password',
    passReqToCallback : true
  },
  async (req, email, password, done) => {
    let entries = await db('person').where('email', email);

    if (entries.length === 0) { return done(null, false); }
    let person = entries[0];
    let passwordIsCorrect = await bcrypt.compare((password || ''), person.password);
    if (!passwordIsCorrect) {
      req.flash('error', "That's not your password.");
      return done(null, false);
    }

    // all is well, return successful user
    return done(null, person);
  }
));

module.exports = passport;
