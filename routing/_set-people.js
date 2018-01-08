let db = require('../db');

module.exports = setPeople;

function setPeople(req, res, next) {
  res.locals.hbs || (res.locals.hbs = {});
  db.from('people')
    .leftJoin('companies', 'people.company_id', 'companies.id')
    .then(people => {
      console.log(people);
      res.locals.hbs.people = people;
      next();
    })
    .catch(e => { console.log(e); });
}
