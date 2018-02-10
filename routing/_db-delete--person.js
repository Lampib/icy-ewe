let db = require('../db');

module.exports = deletePerson;

async function deletePerson(req, res, next) {
  await db('person').where('uuid', (req.params && req.params.personuuid)).del()
  .catch(e => { console.log(e); });
  await db('uuid').where('uuid', (req.params && req.params.personuuid)).del()
  .catch(e => { console.log(e); });
  let phoneNumberCount = await db('phone_number').where('relation_uuid', (req.params && req.params.personuuid)).del()
  .catch(e => { console.log(e); });

  if (deletedCount) {
    console.log(`Deleted user: ${ req.params.personuuid }.`);
    console.log(`And their ${ phoneNumberCount } phone number${ phoneNumberCount === 1 ? '' : 's' }.`);
  }
  next();
}
