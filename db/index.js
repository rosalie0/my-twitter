const db = require('./db');

// Model Imports go here
const Users = require('./users');
const Tweets = require('./tweets');
const Follow = require('./follow');

// Model Associations go here

// One-to-many: One user has many tweets. Each tweet has only one user.
Users.hasMany(Tweets);
Tweets.belongsTo(Users);

// A user follows many users
Users.belongsToMany(Users, {
	through: Follow,
	as: 'Followers',
	//foreignKey: 'FollowersId', // This line is Optional
});

// A user has many followers
Users.belongsToMany(Users, {
	through: Follow,
	as: 'Follows',
	foreignKey: 'FollowsId',
});

module.exports = {
	db,
	Users,
	Tweets,
	Follow,
};
