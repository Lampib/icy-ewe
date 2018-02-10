const countryList = require('countries-list');

module.exports = setCountries;

function setCountries(req, res, next) {
  let primaryCountries = [
    'SG',
    'NO',
    'NL',
    'US',
    'GB',
  ];
  res.locals.hbs.countries = Object.keys(countryList.countries)
    .map(simpleCountryObject)
    .sort((a,b) => a.name.localeCompare(b.name));
  res.locals.hbs.primaryCountries = primaryCountries
    .map(simpleCountryObject);
  next();
}

function simpleCountryObject(code) {
  return {
    code,
    name: countryList.countries[code].name,
  };
}
