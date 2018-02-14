let insertData = require('../routing/_insert-data');
const FIELDS   = require('../config/_schema--person');

module.exports = addPerson;


async function addPerson(req, res, next) {
  await Promise.all(JSON.parse(req.body.people).map(person => {
    return insertData('person', FIELDS, person, {})
  }));
  next();
}
