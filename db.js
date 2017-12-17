let knexfile = require('./knexfile');
let knex     = require('knex');

module.exports = knex(knexfile);
