const knex = require('./knex'); // the connection!

module.exports = {
  getAll() {
    return knex('chatTable');
  },
  create(chatTable) {
    return knex('chatTable').insert(chatTable, '*');
  },
  clearTable() {
      return knex('chatTable').delete('*');
  }
}
