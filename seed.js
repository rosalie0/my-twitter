const { db, Users, Tweets, FollowerFollowing } = require('./db');
const users = [
	{
		username: 'Twitter',
		firstname: 'Twitter',
	},
	{
		username: 'BarackObama',
		firstname: 'Barack',
		lastname: 'Obama',
	},
	{
		username: 'taylorswift13',
		firstname: 'Taylor',
		lastname: 'Swift',
	},
	{
		username: 'justinbieber',
		firstname: 'Justin',
		lastname: 'Bieber',
	},
	{
		username: 'cnnbrk',
		firstname: 'CNN Breaking News',
	},
];

const seedDb = async () => {
	await db.sync({ force: true, logging: false });

	const Promises = users.map((user) => Users.create(user));
	const [twitter, taylorswift, justinbieber, cnn, obama] = await Promise.all(
		Promises
	);

	// Every twitter user follows @twitter
	await twitter.setFollowers([taylorswift, justinbieber, cnn, obama]);

	// @twitter follows every user
	await twitter.setFollows([taylorswift, justinbieber, cnn, obama]);

	// Who are twitter's followers?
	let twittersFollowers = await twitter.getFollowers();
	let twittersFollowersNames = twittersFollowers
		.map((user) => user.username)
		.join(', ');
	console.log(`\nTwitter's followers are: [${twittersFollowersNames}]`);

	let whoObamafollows = await obama.getFollows();
	let whoObamafollowsNames = whoObamafollows
		.map((user) => user.username)
		.join(', ');
	console.log(`Obama follows: [${whoObamafollowsNames}]`);

	// CNN and Obama follow each other.
	await obama.setFollowers(cnn);
	await cnn.setFollowers(obama);
	console.log(`CNN & Obama became mutuals.`);

	// Who are twitter's followers?
	twittersFollowers = await twitter.getFollowers();
	twittersFollowersNames = twittersFollowers
		.map((user) => user.username)
		.join(', ');
	console.log(`Now, twitter's followers are: [${twittersFollowersNames}]`);

	whoObamafollows = await obama.getFollows();
	whoObamafollowsNames = whoObamafollows
		.map((user) => user.username)
		.join(', ');
	console.log(`Now, Obama follows: [${whoObamafollowsNames}]`);

	return;
};

seedDb();
