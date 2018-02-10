
exports.up = function(knex, Promise) {
  return knex.schema.createTable('email', table => {
    table.increments();
    table.timestamps(false, true);

    table.string('label', pow(8));
    table.string('relation_type', pow(5));
    table.string('email', pow(5));

    table.string('uuid', pow(6))
         .notNullable();

    table.string('relation_uuid', pow(6))
         .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('email');
};

function pow(val) {
  return Math.pow(2, val) - 1;
}
