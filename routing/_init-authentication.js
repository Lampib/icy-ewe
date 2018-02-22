let db            = require('../db');
let sendAuthEmail = require('../methods/_authentication-email');

module.exports = async function(req, res, next) {
  if (req.body.authenticate) {
    let people = await db.select('*').from('person').where('email', req.body.email)
                         .catch(err => console.log(err));
    let person = people[0];
    if (!person.authenticator) {
      let authenticator = await sendAuthEmail(req.body.email);
      db('person')
        .where('email', req.body.email)
        .update({
          authenticator,
        })
        .catch(err => console.log(err));
    }
    return res.redirect('/update-password');
  }
  next();
};
