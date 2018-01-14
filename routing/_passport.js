let LocalStrategy = require('passport-local').Strategy;
let db            = require('../db');
let bcrypt        = require('bcrypt');

module.exports = initPassport;

function initPassport(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      db.select('*').from('person').where('id', 1)
        .then(entries => {
          done(err, entries[0]);
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
        let entries = await db.select('*').from('person').where('email', email);
        let person = entries[0];
        if (!person || !person.password) { return done(null, false); }
        let passwordIsCorrect = await bcrypt.compare(password, person.password);

        if (!passwordIsCorrect) { return done(null, false); }

        // all is well, return successful user
        return done(null, person);
      }
    ));
};
