const express = require('express');
const app = express();

const { db, Users, Tweets, FollowerFollowing } = require('./db');

app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res, next) => {
	const twitter = Users.findByPk(1);
});
app.get('/unused', async (req, res, next) => {
	// Who are twitter's followers?
	let whoTwitterFollows = await twitter.getFollows();
	let whoTwitterFollowsNames = whoTwitterFollows
		.map((user) => user.username)
		.join(', ');
	console.log(`\nTwitter's follows are: [${whoTwitterFollowsNames}]`);

	let whoObamafollows = await obama.getFollows();
	let whoObamafollowsNames = whoObamafollows
		.map((user) => user.username)
		.join(', ');
	console.log(`Obama follows: [${whoObamafollowsNames}]`);

	// CNN and Obama follow each other.
	await obama.setFollows(cnn);
	await cnn.setFollows(obama);
	console.log(`CNN & Obama became mutuals.`);

	// Who are twitter's followers?
	whoTwitterFollows = await twitter.getFollows();
	whoTwitterFollowsNames = whoTwitterFollows
		.map((user) => user.username)
		.join(', ');
	console.log(`Now, twitter's follows: [${whoTwitterFollowsNames}]`);

	whoObamafollows = await obama.getFollows();
	whoObamafollowsNames = whoObamafollows
		.map((user) => user.username)
		.join(', ');
	console.log(`Now, Obama follows: [${whoObamafollowsNames}]`);
	res.send('hit main endpoint');
});
