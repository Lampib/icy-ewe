let db = require('../db');

module.exports = deletePerson;

async function deletePerson(req, res, next) {
  let deletedCount = await db('person').where('id', (req.params && req.params.personid)).del()
  .catch(e => { console.log(e); });

  if (deletedCount) {
    console.log(`Deleted user: ${ req.params.personid }.`);
  }
  next();
}
