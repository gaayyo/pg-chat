
exports.up = function(knex, Promise) {
  return knex.schema.createTable('chatTable', (table) => {
    table.increments();
    table.text('name');
    table.text('message')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('chatTable');

};
