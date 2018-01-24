
exports.up = function(knex, Promise) {
  return knex.schema.table('person', table => {
      table.string('role', pow(8));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('person', table => {
      table.dropColumn('role');
  });
};

function pow(val) {
  return Math.pow(2, val) - 1;
}
