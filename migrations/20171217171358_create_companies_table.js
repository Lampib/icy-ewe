exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', table => {
    table.increments('id').primary();
    table.string('company_name', 255).notNullable();
    table.boolean('company_primary').notNullable();
    table.string('company_phone_1', 255);
    table.string('company_phone_2', 255);
    table.string('company_address_line_1', 255).notNullable();
    table.string('company_address_line_2', 255);
    table.string('company_address_line_3', 255);
    table.string('company_address_line_4', 255);
    table.string('company_city', 255).notNullable();
    table.string('company_region', 255);
    table.string('company_postcode', 31);
    table.string('company_country', 63).notNullable();
    table.string('company_notes', 255);
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('companies');
};
