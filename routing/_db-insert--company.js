let db = require('../db');

module.exports = addUser;

function addUser(req, res, next) {
  let requiredFields = [
    'name',
    'address_line_1',
    'city',
    'country',
  ];
  let booleanFields = [
    'primary',
  ];
  let optionalFields = [
    'address_line_2',
    'address_line_3',
    'address_line_4',
    'region',
    'postcode',
    'phone_1',
    'phone_2',
    'notes',
  ];

  let toInsert = {};

  requiredFields.forEach(fieldName => {
    if (!req.body[fieldName]) {
      throw Error(`Required field "${ fieldName }" was not provided when adding company.`);
    }
    toInsert[fieldName] = req.body[fieldName];
  });

  booleanFields.forEach(fieldName => {
    let positiveValues = [
      true, 'true', 'on', 'True', 'TRUE',
    ];
    if (positiveValues.indexOf(req.body[fieldName]) > -1) {
      toInsert[fieldName] = true;
    } else {
      toInsert[fieldName] = false;
    }
  });

  optionalFields.forEach(fieldName => {
    req.body[fieldName] && (toInsert[fieldName] = req.body[fieldName]);
  });

  db('company').insert(toInsert)
  .then(() => {
    next();
  });
}
