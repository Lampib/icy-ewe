exports.up = function(knex, Promise) {
  return knex.schema.createTable('company', table => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.boolean('primary').notNullable();
    table.string('phone_1', 255);
    table.string('phone_2', 255);
    table.string('address_line_1', 255).notNullable();
    table.string('address_line_2', 255);
    table.string('address_line_3', 255);
    table.string('address_line_4', 255);
    table.string('city', 255).notNullable();
    table.string('region', 255);
    table.string('postcode', 31);
    table.string('country', 63).notNullable();
    table.string('notes', 255);
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('company');
};
