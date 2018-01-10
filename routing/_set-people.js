let db = require('../db');

module.exports = setPeople;

function setPeople(req, res, next) {
  res.locals.hbs || (res.locals.hbs = {});
  db.from('people')
    .leftJoin('companies', 'people.company_id', 'companies.id')
    .then(people => {
      res.locals.hbs.people = people;
      res.locals.hbs.primaryPeople = people.filter(person => person.primary);
      next();
    })
    .catch(e => { console.log(e); });
}
