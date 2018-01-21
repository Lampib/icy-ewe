
exports.seed = function(knex, Promise) {
  return knex('company').insert([{
      id             : 1,
      name           : 'Preco',
      primary        : true,
      address_line_1 : 'Preco lane',
      country        : 'Norway',
      city           : 'Oslo',
    }])
    .then(() =>
      knex('person').insert([{
        id         : 1,
        name       : 'Tom Preststulen',
        admin      : true,
        primary    : true,
        password   : '$2a$11$paqedZCijsw73dYnW3wlM.fYFRv7bVsa6OYflyuJabCxqweVGPP1K', // 12341234
        email      : 'tom@email.com',
        thumb      : '/assets/images/tom.jpg',
        company_id : 1,
      }])
    );
};
