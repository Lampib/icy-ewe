let db         = require('../db');
let flashError = require('../methods/_flash-error');

module.exports = deletePerson;

async function deletePerson(req, res, next) {
  let peopleIDs = req.body && req.body.people
    ? JSON.parse(req.body.people)
    : [];

  await Promise.all(peopleIDs.map(uuid => {
    return Promise.all([
      db('person').where('uuid', (uuid)).del()
      .catch(err => { flashError(req, err); }),
      db('uuid').where('uuid', (uuid)).del()
      .catch(err => { flashError(req, err); }),
      db('phone_number').where('relation_uuid', (uuid)).del()
      .catch(err => { flashError(req, err); }),
    ]);
  }));

  next();
}
