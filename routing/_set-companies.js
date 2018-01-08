let db = require('../db');

module.exports = setCompanies;

function setCompanies(req, res, next) {
  res.locals.hbs || (res.locals.hbs = {});
  db.select('id','company_name').from('companies')
    .then(companies => {
      res.locals.hbs.companies = companies;
      next();
    })
    .catch(e => { console.log(e); });
}
