const hbs = require('hbs');
const countryList = require('countries-list');

module.exports = hbs;

hbs.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
      accum += block.fn(i);
  return accum;
});

hbs.registerHelper('countryName', function(countryCode) {
  return countryList.countries[countryCode] && countryList.countries[countryCode].name;
});
