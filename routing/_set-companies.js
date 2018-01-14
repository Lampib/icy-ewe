let db = require('../db');

module.exports = setCompanies;

function setCompanies(req, res, next) {
  res.locals.hbs || (res.locals.hbs = {});
  db.select('*').from('company')
    .then(companies => {
      res.locals.hbs.companies = companies;
      res.locals.hbs.primaryCompanies = companies.filter(company => company.primary);
      next();
    })
    .catch(e => { console.log(e); });
}
