const hbs = require('hbs');
const countryList = require('countries-list');
const marked = require('marked');

module.exports = hbs;

hbs.registerHelper('times', function(n, block) {
  return new Array(n).fill(block.fn()).join('');
});

hbs.registerHelper('countryName', function(countryCode) {
  return countryList.countries[countryCode] && countryList.countries[countryCode].name;
});

hbs.registerHelper('md', function(markdown) {
  let htmlString = marked(markdown, {
    gfm         : true,
    tables      : true,
    breaks      : true,
    pedantic    : false,
    sanitize    : true,
    smartLists  : true,
    smartypants : true,
  });
  return new hbs.SafeString(htmlString);
});
