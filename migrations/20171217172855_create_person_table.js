exports.up = function(knex, Promise) {
  return knex.schema.createTable('person', table => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.boolean('primary').notNullable();
    table.string('email', 255).notNullable();
    table.integer('company_id').unsigned();
    table.string('phone_1', 255);
    table.string('phone_2', 255);
    table.string('thumb', 255);
    table.string('person_notes', 255);
    table.foreign('id')
      .references('id')
      .inTable('company');
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('people');
};
