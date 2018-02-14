
const uuidv4 = require('uuid/v4');

exports.seed = function(knex, Promise) {
  let companyHash      = '4d3dcbf4-f8e1-4484-a4db-6351168d40dc';
  let companyPhoneHash = uuidv4();
  let companyEmailHash = uuidv4();

  return Promise.all([
    knex('uuid').insert([{
      uuid  : companyHash,
      table : 'company',
    }]),
    knex('uuid').insert([{
      uuid  : companyPhoneHash,
      table : 'phone_number',
    }]),
    knex('uuid').insert([{
      uuid  : companyEmailHash,
      table : 'email',
    }]),
    knex('company').insert([{
      uuid           : companyHash,
      name           : 'Preco',
      display        : true,
      address_line_1 : 'Preco lane',
      country        : 'Norway',
      city           : 'Oslo',
      image          : '/assets/images/preco.jpg',
    }]),
    knex('phone_number').insert([{
      uuid          : companyPhoneHash,
      relation_uuid : companyHash,
      label         : 'Primary',
      relation_type : 'company',
      phone_number  : '+65 3738 9584',
    }]),
    knex('email').insert([{
      uuid         : companyEmailHash,
      relation_uuid    : companyHash,
      label        : 'Primary',
      relation_type    : 'company',
      email        : 'contact@preco.io',
    }]),
  ]);
};
