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
    name     : 'display',
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
    name     : 'phone_number',
    type     : 'one2many',
    fields : [
      {
        name : 'label',
        type : 'string',
      },
      {
        name : 'phone_number',
        type : 'string',
      },
    ],
  },
  {
    name     : 'email',
    type     : 'one2many',
    fields : [
      {
        name : 'label',
        type : 'string',
      },
      {
        name : 'email',
        type : 'string',
      },
    ],
  },
  {
    name     : 'website',
    type     : 'string',
  },
  {
    name     : 'email',
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
  {
    name     : 'image',
    type     : 'image',
  },
];

module.exports = addPerson;


async function addPerson(req, res, next) {
  await insertData('company', FIELDS, req.body, req.files);
  next();
}
