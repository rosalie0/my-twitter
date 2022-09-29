const Sequelize = require('sequelize');

const DB_URL = process.env.DB_URL || 'postgres://localhost:5432/mytwitter';

const db = new Sequelize(DB_URL, {
	logging: false,
});

module.exports = db;
