let db     = require('../db');
let bcrypt = require('bcrypt');

module.exports = updatePassword;

async function updatePassword(req, res, next) {
  if (!req.body.authenticator
    || !req.body.email
    || !req.body.password) {
    return res.redirect('/update-password');
  }

  let people = await db.select('authenticator').from('person').where('email', req.body.email)
                       .catch(err => console.log(err));
  let person = people[0];
  let authenticatorIsCorrect = await bcrypt.compare(req.body.authenticator, person.authenticator)
                                           .catch(err => console.log(err));
  let password = await bcrypt.hash(req.body.password, 11)
                             .catch(err => console.log(err));
  await db('person')
    .where('email', req.body.email)
    .update({
      password,
      authenticator: null,
    })
    .catch(err => console.log(err));

  next();
}
