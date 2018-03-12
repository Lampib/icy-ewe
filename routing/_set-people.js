let db         = require('../db');
let flashError = require('../methods/_flash-error');

module.exports = setPeople;

async function setPeople(req, res, next) {
  let user = req.user;

  res.locals.hbs.people = [];

  let peopleRaw = await db.select('*').from('person')
    .leftJoin('company', 'person.company_uuid', 'company.uuid')
    .options({ nestTables : true })
    .catch(err => flashError(req, err));

  let phoneNumbers = await db.select('phone_number', 'label', 'relation_uuid', 'uuid').from('phone_number')
    .where(function() {
      peopleRaw.forEach(person => {
        this.orWhere('relation_uuid', person.person.uuid);
      });
    });

  let people = peopleRaw.map((data) => Object.assign(data.person, {
      isUser       : user && (user.uuid === data.person.uuid),
      company      : data.company,
      canEdit      : user && (user.super_admin || (user.admin && user.company_uuid === data.person.company_uuid)),
      phoneNumbers : phoneNumbers.filter(phoneNumber => phoneNumber.relation_uuid === data.person.uuid),
  }));

  res.locals.hbs.people           = people;
  res.locals.hbs.displayPeople    = people.filter(person => person.display);
  res.locals.hbs.nonDisplayPeople = people.filter(person => !person.display);

  next();
}
