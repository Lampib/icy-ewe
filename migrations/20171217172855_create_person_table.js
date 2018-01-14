exports.up = function(knex, Promise) {
  return knex.schema.createTable('person', table => {
    table.increments('id').primary();
    table.boolean('primary')
         .notNullable();
    table.string('password', pow(8));
    table.string('name', pow(8))
         .notNullable();
    table.string('email', pow(8))
         .notNullable();
    table.integer('company_id').unsigned();
    table.string('phone_1', pow(8));
    table.string('phone_2', pow(8));
    table.string('thumb', pow(8));
    table.string('person_notes', pow(8));
    table.foreign('company_id')
      .references('id')
      .inTable('company');
    table.timestamps(false, true);
    table.unique('email');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('person');
};

function pow(val) {
  return Math.pow(2, val) - 1;
}
