const { db, Users, Tweets, Follow, TweetsTaggedUsers } = require('./db');
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
	console.log(fr);
	twittersFollowers = fr.map((user) => user.username);
	//console.log(`Twitter follows: [${whoTwitterFollows}]`);
	//console.log(`Twitter's followers: [${twittersFollowers}]`);

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
	// console.log(`Taylor Swift is followed by: ${taylorsFollowersNames}`);

	await obama.addFollows(cnn); // Obama followed CNN
	await cnn.addFollows(obama); // Cnn followed Obama back

	// Initial query for Obama's Followers
	let whoFollowsObama = await obama.getFollowers();
	let whoFollowsObamaNames = whoFollowsObama.map((user) => user.username);
	// console.log(`Obama is followed by: ${whoFollowsObamaNames}`);

	// Obama gets a new follower
	await taylorswift.addFollows(obama);
	//console.log('Taylor Swift followed Obama!');

	//  Requery for Obama's Followers - should now have taylor!
	whoFollowsObama = await obama.getFollowers();
	whoFollowsObamaNames = whoFollowsObama.map((user) => user.username);
	//console.log(`Obama is followed by: ${whoFollowsObamaNames}`);

	const obamaTweets = await makeObamaTweets(obama, cnn);
	console.log(obamaTweets);
};

const makeObamaTweets = async (obama, cnn) => {
	// Magic Methods for Tweets Model
	console.log(Object.keys(Tweets.prototype));

	// Version 1: Hard-coding the userId
	const tweet1 = await Tweets.create({
		content:
			"Being a father is sometimes my hardest but always my most rewarding job. Happy Father's Day to all the dads out there. -BO",
		userId: obama.id,
	});

	// Version 2: using 'addTweet' Magic method
	const tweet2 = await Tweets.create({
		content:
			"Alright, let's do this. Ready to answer your health care questions. Keep 'em coming with #AskPOTUS.",
	});
	await obama.addTweet(tweet2);

	// Version 3: using 'setUser' Magic method
	const tweet3 = await Tweets.create({
		content:
			'¿Que bolá Cuba? Just touched down here, looking forward to meeting and hearing directly from the Cuban people.',
	});
	await tweet3.setUser(obama);

	const tweet4 = await Tweets.create({
		content: 'Just had an interview with @CNNBRK.',
		taggedUserId: cnn.id, // This doesn't do anything.
	});

	//await tweet4.addTaggedUser(cnn); This line makes it crash
	await obama.addTweet(tweet4);

	return await obama.getTweets();
};

seedDb();
