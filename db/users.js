const Sequelize = require('sequelize');
const db = require('./db');

const Users = db.define('users', {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: true, // don't allow empty strings
		},
		get() {
			return `@${this.getDataValue('username')}`;
		},
	},
	role: {
		type: Sequelize.ENUM(['USER', 'ADMIN']),
		defaultValue: 'USER',
	},
	firstname: {
		type: Sequelize.STRING(30),
		get() {
			const currName = this.getDataValue('firstname');
			const firstLetter = currName[0].toUpperCase();
			const otherLetters = currName.slice(1);
			return firstLetter + otherLetters;
		},
		set(value) {
			const lowerCaseName = value.toLowerCase();
			this.setDataValue('firstname', lowerCaseName);
		},
	},
	lastname: {
		type: Sequelize.STRING(30),
		get() {
			const currName = this.getDataValue('firstname');
			const firstLetter = currName[0].toUpperCase();
			const otherLetters = currName.slice(1);
			return firstLetter + otherLetters;
		},
		set(value) {
			const lowerCaseName = value.toLowerCase();
			this.setDataValue('lastname', lowerCaseName);
		},
	},
	fullname: {
		type: Sequelize.VIRTUAL,
		get() {
			const firstname = this.getDataValue('firstname');
			const lastname = this.getDataValue('lastname');
			return `${firstname} ${lastname}`;
		},
	},
});

module.exports = Users;
