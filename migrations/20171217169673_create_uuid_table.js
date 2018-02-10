exports.up = function(knex, Promise) {
  return knex.schema.createTable('uuid', table => {
    table.increments();
    table.timestamps(false, true);

    table.string('uuid', pow(6))
         .notNullable();
    table.string('table', pow(5))
         .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('uuid');
};

function pow(val) {
  return Math.pow(2, val) - 1;
}
