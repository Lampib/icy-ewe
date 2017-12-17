exports.up = function(knex, Promise) {
  return knex.schema.createTable('people', table => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('phone', 255).notNullable();
    table.integer('company_id').unsigned();
    table.foreign('company_id')
      .references('id')
      .inTable('companies');
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('people');
};
