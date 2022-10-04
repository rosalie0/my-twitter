const db = require('./db');

// Model Imports go here
const Users = require('./users');
const Tweets = require('./tweets');
const Follow = require('./follow');
const TweetsTaggedUsers = require('./tweetsTaggedUsers');

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

// One tweet can have 'tagged' many users.
// a User can be tagged in many different tweets.
Tweets.belongsToMany(Users, {
	through: TweetsTaggedUsers,
	as: 'taggedUser',
	foreignKey: 'taggedUserId',
});

Users.belongsToMany(Tweets, {
	through: TweetsTaggedUsers,
	as: 'taggedIn',
	foreignKey: 'taggedUserId',
});

module.exports = {
	db,
	Users,
	Tweets,
	Follow,
	TweetsTaggedUsers,
};
