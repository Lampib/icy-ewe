module.exports = [
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
    name     : 'company_uuid',
    type     : 'string',
    required : true,
  },
  {
    name     : 'password',
    type     : 'password',
  },
  {
    name     : 'display',
    type     : 'boolean',
  },
  {
    name     : 'admin',
    type     : 'boolean',
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
    name     : 'role',
    type     : 'string',
  },
  {
    name     : 'thumb',
    type     : 'image',
  },
];
