const db = require('./db');

// Model Imports go here
const Users = require('./users');
const Tweets = require('./tweets');
const FollowerFollowing = require('./follow');

// Model Associations go here

// One-to-many:
Users.hasMany(Tweets);
Tweets.belongsTo(Users);

// // A member has one other member as a sponsor.
// Member.belongsTo(Member, { as: 'sponsor', foreignKey: 'sponsorId' });
// // A member can have many 'sponsees', aka other members sponsored by them.
// Member.hasMany(Member, { as: 'sponsees' });

// A user has many followers
Users.belongsToMany(Users, {
	through: FollowerFollowing,
	as: 'followers',
	foreignKey: 'userFollowedId',
});

// // A user follows many users.
Users.belongsToMany(Users, {
	through: FollowerFollowing,
	as: 'follows',
	foreignKey: 'followedBy',
});

module.exports = {
	db,
	Users,
	Tweets,
	FollowerFollowing,
};
