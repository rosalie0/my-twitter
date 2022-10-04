const { db, Users, Tweets, Follow } = require('./db');
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
	const [twitter, obama, taylorswift, justinbieber, cnn] = await Promise.all(
		Promises
	);

	// Magic Methods:
	//console.log(Object.keys(Users.prototype));

	// @twitter follows every user on the site.
	await twitter.addFollows([taylorswift, justinbieber, cnn, obama]);
	// Every twitter user follows @twitter.
	await twitter.addFollower([taylorswift, justinbieber, cnn, obama]);

	// Queries for  twitter in both directions
	follows = await twitter.getFollows();
	whoTwitterFollows = follows.map((user) => user.username);
	fr = await twitter.getFollowers();
	twittersFollowers = fr.map((user) => user.username);
	console.log(`Twitter follows: [${whoTwitterFollows}]`);
	console.log(`Twitter's followers: [${twittersFollowers}]`);

	// Trying to query for a certain user's followers.
	// Does not work.
	/*
	const test = await Users.findAll({
		includes: [
			{
				model: Users,
				as: 'Follows',
				through: {
					where: {
						username: taylorswift.username,
					},
				},
			},
		],
	});
	console.log({ test });
	*/

	// Much easier to get a user's followers using magic methods!
	const taylorsFollowers = await taylorswift.getFollowers();
	//console.log({ taylorsFollowers });

	const taylorsFollowersNames = taylorsFollowers.map((user) => user.username);
	console.log(`Taylor Swift is followed by: ${taylorsFollowersNames}`);

	await obama.addFollows(cnn); // Obama followed CNN
	await cnn.addFollows(obama); // Cnn followed Obama back

	// Initial query for Obama's Followers
	let whoFollowsObama = await obama.getFollowers();
	let whoFollowsObamaNames = whoFollowsObama.map((user) => user.username);
	console.log(`Obama is followed by: ${whoFollowsObamaNames}`);

	// Obama gets a new follower
	await taylorswift.addFollows(obama);
	console.log('Taylor Swift followed Obama!');

	//  Requery for Obama's Followers - should now have taylor!
	whoFollowsObama = await obama.getFollowers();
	whoFollowsObamaNames = whoFollowsObama.map((user) => user.username);
	console.log(`Obama is followed by: ${whoFollowsObamaNames}`);

	const tweet1 = await Tweets.create({
		content: 'Hello World',
		userId: obama.id,
	});

	const tweet2 = await Tweets.create({
		content: 'Goodbye World',
	});
	await obama.addTweet(tweet2);

	const tweet3 = await Tweets.create({
		content: 'Hello Again World',
	});
	tweet3.setUser(obama);
	console.log(await obama.getTweets());

	// Magic Methods for Tweets Model
	console.log(Object.keys(Tweets.prototype));
};

seedDb();
