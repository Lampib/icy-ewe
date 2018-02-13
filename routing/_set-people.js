let db = require('../db');

module.exports = setPeople;

function setPeople(req, res, next) {
  let user = req.user;

  db.select('*').from('person')
    .leftJoin('company', 'person.company_uuid', 'company.uuid')
    .options({ nestTables : true })
    .then(async (peopleRaw) => {
      let phoneNumbers = await db.select('phone_number', 'label', 'relation_uuid').from('phone_number')
        .where(function() {
          peopleRaw.forEach(person => {
            this.orWhere('relation_uuid', person.person.uuid);
          });
        });
      let people = await Promise.all(peopleRaw.map(async (data) => {
        let person          = data.person;
        person.isUser       = user && (user.uuid === person.uuid);
        person.company      = data.company;
        person.canEdit      = user && (user.super_admin || (user.admin && user.company_uuid === person.company_uuid));
        person.phoneNumbers = phoneNumbers.filter(phoneNumber => phoneNumber.relation_uuid === person.uuid);
        return person;
      }));
      res.locals.hbs.people = people;
      res.locals.hbs.displayPeople = people.filter(person => person.display);
      res.locals.hbs.nonPrimaryPeople = people.filter(person => !person.display);
      next();
    })
    .catch(err => {
      console.log(err);
      res.locals.hbs.people = [];
    });
}
