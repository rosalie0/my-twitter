const Sequelize = require('sequelize');
const db = require('./db');

const TweetsTaggedUsers = db.define('tweetsTaggedUsers', {});

module.exports = TweetsTaggedUsers;
