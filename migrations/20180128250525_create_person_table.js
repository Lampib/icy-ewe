exports.up = function(knex, Promise) {
  return knex.schema.createTable('person', table => {
    table.increments();
    table.timestamps(false, true);

    table.boolean('display')
         .notNullable();
    table.boolean('admin')
         .notNullable();
    table.boolean('super_admin')
         .defaultTo(false)
         .notNullable();
    table.string('password', pow(8));
    table.string('authenticator', pow(8));
    table.string('name', pow(8))
         .notNullable();
    table.string('email', pow(8))
         .unique()
         .notNullable();
    table.string('role', pow(8));
    table.string('thumb', pow(8));
    table.string('person_notes', pow(8));

    table.string('uuid', pow(6))
         .notNullable();

    table.string('company_uuid', pow(6))
         .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('person');
};

function pow(val) {
  return Math.pow(2, val) - 1;
}
