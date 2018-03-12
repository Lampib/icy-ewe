let bcrypt     = require('bcrypt');
let db         = require('../db');
let flashError = require('../methods/_flash-error');

module.exports = updatePassword;

async function updatePassword(req, res, next) {
  if (!req.body.authenticator
    || !req.body.email
    || !req.body.password) {
    return res.redirect('/update-password');
  }

  let people = await db
    .select('authenticator').from('person').where('email', req.body.email)
    .catch(err => flashError(req, err));
  let person = people[0];
  let authenticatorIsCorrect = await bcrypt
    .compare(req.body.authenticator, person.authenticator)
    .catch(err => flashError(req, err));
  let password = await bcrypt
    .hash(req.body.password, 11)
    .catch(err => flashError(req, err));
  await db('person')
    .where('email', req.body.email)
    .update({
      password,
      authenticator: null,
    })
    .catch(err => flashError(req, err));

  next();
}
