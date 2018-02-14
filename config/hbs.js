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

hbs.registerPartial('preco_logo', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 98" class="preco-logo"><style>.p-l--grey {fill: #4f4c4c;}.p-l--red {fill: #810f1d;}</style><circle cx="7" cy="7" r="7" class="p-l--grey"/><circle cx="7" cy="35" r="7" class="p-l--grey"/><circle cx="7" cy="63" r="7" class="p-l--grey"/><circle cx="35" cy="7" r="7" class="p-l--grey"/><circle cx="21" cy="21" r="7" class="p-l--grey"/><circle cx="21" cy="49" r="7" class="p-l--grey"/><circle cx="63" cy="7" r="7" class="p-l--grey"/><circle cx="49" cy="21" r="7" class="p-l--grey"/><circle cx="21" cy="77" r="7" class="p-l--grey"/><circle cx="77" cy="21" r="7" class="p-l--grey"/><circle cx="35" cy="35" r="7" class="p-l--red"/><circle cx="35" cy="63" r="7" class="p-l--red"/><circle cx="35" cy="91" r="7" class="p-l--red"/><circle cx="63" cy="35" r="7" class="p-l--red"/><circle cx="63" cy="63" r="7" class="p-l--red"/><circle cx="63" cy="91" r="7" class="p-l--red"/><circle cx="91" cy="35" r="7" class="p-l--red"/><circle cx="91" cy="63" r="7" class="p-l--red"/><circle cx="91" cy="91" r="7" class="p-l--red"/><path d="M34 35h2v56h-2zM62 35h2v56h-2zM90 35h2v56h-2z" class="p-l--red"/><path d="M35 34h56v2H35zM36 62h56v2H36zM36 90h56v2H36z" class="p-l--red"/></svg>');
