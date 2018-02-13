let db = require('../db');

module.exports = deletePerson;

async function deletePerson(req, res, next) {
  let body = req.body;

  if (body.uuid) {
    await db('person').where('uuid', (body.uuid)).del()
    .catch(e => { console.log(e); });
    await db('uuid').where('uuid', (body.uuid)).del()
    .catch(e => { console.log(e); });
    let phoneNumberCount = await db('phone_number').where('relation_uuid', (body.uuid)).del()
    .catch(e => { console.log(e); });
  }

  next();
}
