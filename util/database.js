const Sequelize = require('sequelize');

const sequelize = new Sequelize('codegig', 'root', 'Abhay123#Goswami', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
