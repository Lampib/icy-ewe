let insertData = require('../routing/_insert-data');

const FIELDS = [
  {
    name      : 'name',
    type      : 'string',
    required  : true,
  },
  {
    name     : 'address_line_1',
    type     : 'string',
    required : true,
  },
  {
    name     : 'primary',
    type     : 'boolean',
    required : true,
  },
  {
    name     : 'address_line_2',
    type     : 'string',
  },
  {
    name     : 'address_line_3',
    type     : 'string',
  },
  {
    name     : 'address_line_4',
    type     : 'string',
  },
  {
    name     : 'city',
    type     : 'string',
    required : true,
  },
  {
    name     : 'region',
    type     : 'string',
  },
  {
    name     : 'country',
    type     : 'string',
    required : true,
  },
  {
    name     : 'postcode',
    type     : 'string',
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
    name     : 'notes',
    type     : 'string',
  },
  {
    name     : 'description',
    type     : 'string',
  },
];

module.exports = addPerson;

async function addPerson(req, res, next) {
  await insertData('company', FIELDS, req.body, req.files);
  next();
}

