exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', table => {
    table.increments('id').primary();
    table.string('company_name', 255).notNullable();
    table.string('address_line_1', 255).notNullable();
    table.string('address_line_2', 255);
    table.string('address_line_3', 255);
    table.string('address_line_4', 255);
    table.string('city', 255).notNullable();
    table.string('region', 255);
    table.string('postcode', 31);
    table.string('country', 63).notNullable();
    table.string('company_notes', 255);
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('companies');
};
