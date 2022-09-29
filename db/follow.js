const Sequelize = require('sequelize');
const db = require('./db');

const FollowerFollowing = db.define('followerfollowing', {});

module.exports = FollowerFollowing;
