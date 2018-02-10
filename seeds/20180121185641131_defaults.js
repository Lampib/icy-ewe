
const uuidv4 = require('uuid/v4');

exports.seed = function(knex, Promise) {
  let personHash       = uuidv4();
  let companyHash      = uuidv4();
  let personPhoneHash  = uuidv4();
  let companyPhoneHash = uuidv4();
  let companyEmailHash = uuidv4();

  return Promise.all([
    knex('uuid').insert([{
      uuid  : personHash,
      table : 'person',
    }]),
    knex('uuid').insert([{
      uuid  : personPhoneHash,
      table : 'phone_number',
    }]),
    knex('person').insert([{
      uuid         : personHash,
      company_uuid : companyHash,
      name         : 'Tom Preststulen',
      admin        : true,
      super_admin  : true,
      display      : true,
      password     : '$2a$11$paqedZCijsw73dYnW3wlM.fYFRv7bVsa6OYflyuJabCxqweVGPP1K', // 12341234
      email        : 'tom@email.com',
      thumb        : '/assets/images/tom.jpg',
    }]),
    knex('phone_number').insert([{
      uuid          : personPhoneHash,
      relation_uuid : personHash,
      label         : 'Primary',
      relation_type : 'person',
      phone_number  : '+65 3738 9584',
    }]),

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
