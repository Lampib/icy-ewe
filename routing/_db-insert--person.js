let insertData = require('../routing/_insert-data');

const FIELDS = [
  {
    name     : 'name',
    type     : 'string',
    required : true,
  },
  {
    name     : 'email',
    type     : 'string',
    required : true,
  },
  {
    name     : 'company_id',
    type     : 'string',
    required : true,
  },
  {
    name     : 'password',
    type     : 'password',
  },
  {
    name     : 'primary',
    type     : 'boolean',
  },
  {
    name     : 'admin',
    type     : 'boolean',
  },
  {
    name     : 'phone_1',
    type     : 'string',
  },
  {
    name     : 'phone_2',
    type     : 'string',
  },
  {
    name     : 'thumb',
    type     : 'image',
  },
];

module.exports = addPerson;


async function addPerson(req, res, next) {
  await insertData('person', FIELDS, req.body, req.files);
  next();
}
