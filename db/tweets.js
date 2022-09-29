const Sequelize = require('sequelize');
const db = require('./db');

const Tweets = db.define('tweets', {
	content: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

module.exports = Tweets;
