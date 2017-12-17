let db = require('../db');

module.exports = addUser;

function addUser(req, res, next) {
  let requiredFields = [
    'name',
    'email',
    'company_id',
  ];

  let optionalFields = [
    'phone',
  ];

  let toInsert = {};

  requiredFields.forEach(fieldName => {
    toInsert[fieldName] = req.body[fieldName];
  });
  optionalFields.forEach(fieldName => {
    req.body[fieldName] && (toInsert[fieldName] = req.body[fieldName]);
  });

  db('people').insert(toInsert)
  .then(() => {
    next();
  });
}
