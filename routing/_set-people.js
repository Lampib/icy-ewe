let db = require('../db');

module.exports = setPeople;

function setPeople(req, res, next) {
  db.select('*').from('person')
    .leftJoin('company', 'person.company_uuid', 'company.uuid')
    .options({ nestTables : true })
    .then(peopleRaw => {
      let people = peopleRaw.map(data => {
        let person = data.person;
        person.isUser = req.user && (req.user.uuid === person.uuid);
        person.company = data.company;
        return person;
      });
      res.locals.hbs.people = people;
      res.locals.hbs.displayPeople = people.filter(person => person.display);
      res.locals.hbs.nonPrimaryPeople = people.filter(person => !person.display);
      next();
    })
    .catch(e => {
      console.log(e);
      res.locals.hbs.people = [];
    });
}
