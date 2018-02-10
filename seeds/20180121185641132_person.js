
const uuidv4 = require('uuid/v4');

exports.seed = function(knex, Promise) {
  let companyHash      = '4d3dcbf4-f8e1-4484-a4db-6351168d40dc';
  let personHash       = uuidv4();
  let personPhoneHash  = uuidv4();

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
  ]);
};
