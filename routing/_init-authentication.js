let db            = require('../db');
let sendAuthEmail = require('../methods/_authentication-email');
let flashError    = require('../methods/_flash-error');

module.exports = async function(req, res, next) {
  if (req.body.authenticate) {
    let people = await db.select('*').from('person').where('email', req.body.email)
                         .catch(err => flashError(req, err));
    let person = people[0];
    //if (!person.authenticator) {
      let authenticator = await sendAuthEmail(req.body.email)
        .then(authenticator => {
          console.log(`Reset password email sent to: "${ req.body.email }".`);
          return authenticator;
        })
        .catch(err => flashError(req, err));
      db('person')
        .where('email', req.body.email)
        .update({
          authenticator,
        })
        .catch(err => flashError(req, err));
    //}
    return res.redirect('/update-password');
  }
  next();
};
