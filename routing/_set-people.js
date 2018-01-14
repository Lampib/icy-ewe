let db = require('../db');

module.exports = setPeople;

function setPeople(req, res, next) {
  res.locals.hbs || (res.locals.hbs = {});
  db.select('*').from('person')
    .leftJoin('company', 'person.company_id', 'company.id')
    .options({ nestTables : true })
    .then(people => {
      res.locals.hbs.people = people;
      res.locals.hbs.primaryPeople = people.filter(person => person.primary);
      console.log(people);
      next();
    })
    .catch(e => {
      console.log(e);
      res.locals.hbs.people = [];
    });
}
