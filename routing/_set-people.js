let db = require('../db');

module.exports = setPeople;

function setPeople(req, res, next) {
  db.select('*').from('person')
    .leftJoin('company', 'person.company_id', 'company.id')
    .options({ nestTables : true })
    .then(peopleRaw => {
      let people = peopleRaw.map(data => {
        let person = data.person;
        person.isUser = req.user && req.user.id === person.id;
        person.company = data.company;
        return person;
      });
      res.locals.hbs.people = people;
      res.locals.hbs.primaryPeople = people.filter(person => person.primary);
      res.locals.hbs.nonPrimaryPeople = people.filter(person => !person.primary);
      next();
    })
    .catch(e => {
      console.log(e);
      res.locals.hbs.people = [];
    });
}
