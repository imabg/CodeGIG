const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Gigs = sequelize.define('codegigs', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  gigname: Sequelize.STRING,
  technologies: {
    type: Sequelize.STRING,
    allowNull: false
  },
  budget: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  contactEmail: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Gigs;
