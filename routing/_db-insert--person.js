let insertData = require('../routing/_insert-data');
const FIELDS   = require('../config/_schema--person');

module.exports = addPerson;


async function addPerson(req, res, next) {
  await insertData('person', FIELDS, req.body, req.files);
  next();
}
