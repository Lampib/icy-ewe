exports.up = function(knex, Promise) {
  return knex.schema.createTable('company', table => {
    table.increments('id').primary();
    table.boolean('primary')
         .notNullable();
    table.string('name', pow(8))
         .notNullable();
    table.string('phone_1', pow(8));
    table.string('phone_2', pow(8));
    table.string('address_line_1', pow(8))
        .notNullable();
    table.string('address_line_2', pow(8));
    table.string('address_line_3', pow(8));
    table.string('address_line_4', pow(8));
    table.string('city', pow(8))
        .notNullable();
    table.string('region', pow(8));
    table.string('postcode', pow(5));
    table.string('country', pow(6))
        .notNullable();
    table.string('notes', pow(12));
    table.string('description', pow(12))
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('company');
};

function pow(val) {
  return Math.pow(2, val) - 1;
}
