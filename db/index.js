const db = require('./db');

// Model Imports go here
const Users = require('./users');
const Tweets = require('./tweets');
const Follow = require('./follow');

// Model Associations go here

// One-to-many:
Users.hasMany(Tweets);
Tweets.belongsTo(Users);

// // A member has one other member as a sponsor.
// Member.belongsTo(Member, { as: 'sponsor', foreignKey: 'sponsorId' });
// // A member can have many 'sponsees', aka other members sponsored by them.
// Member.hasMany(Member, { as: 'sponsees' });

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
