let db = require('../db');

module.exports = addUser;

function addUser(req, res, next) {
  let requiredFields = [
    'company_name',
    'address_line_1',
    'city',
    'country',
  ];

  let optionalFields = [
    'address_line_2',
    'address_line_3',
    'address_line_4',
    'region',
    'postcode',
    'notes',
  ];

  let toInsert = {};

  requiredFields.forEach(fieldName => {
    toInsert[fieldName] = req.body[fieldName];
  });
  optionalFields.forEach(fieldName => {
    req.body[fieldName] && (toInsert[fieldName] = req.body[fieldName]);
  });

  db('companies').insert(toInsert)
  .then(() => {
    next();
  });
}
