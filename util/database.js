const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
