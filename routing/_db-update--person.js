let insertData = require('../routing/_insert-data');
const FIELDS   = require('../config/_schema--person');

module.exports = addPerson;


async function addPerson(req, res, next) {
  console.log('Oh hai there!');
  console.log(req.body.users);
  await Promise.all(JSON.parse(req.body.users).map(person => {
    console.log(person);
    return insertData('person', FIELDS, person, {})
  }));
  next();
}
