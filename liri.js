

require("dotenv").config();

//Set-up for Node.js: Links to keys.js, twitter and spotify package

var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');

var command = process.argv[2];
var argument = process.argv.slice(3).join(" ");

execute(command, argument);

//Command and argument entered into 2nd and 3rd entry in Terminal
//2nd entry is command for which package to run
//3rd entry is argument for specific post, song, or movie 

function execute(command, argument) {

//Will display a message about which command and argument was entered
	var logMessage = 'executing command {' + command +
		'} on argument {' + argument + '}';

	console.log(logMessage);

//Moment.js to show time stamp
	var dateTimeStamp = moment().format("MMM DD hh:mm:ss");

fs.appendFile('log.txt', dateTimeStamp + ':  '
	  + logMessage + '\r\n', function(err) {

		// If an error was experienced we say it.
		if (err) {
			console.log(err);
		}
	});

//if-else statements for type of command entered

if (command === 'my-tweets') {
		myTweets();

} else if (command === 'spotify-this-song') {

		if (argument) {
			spotifySong(argument);

		} else {
			spotifySong('The Sign Ace of Base');
		}

	} else if (command === 'movie-this') {

		if (argument) {
			movieThis(argument);

		} else {
			movieThis('Mr. Nobody');
		}

//will read random.txt file
	} else if (command === 'do-what-it-says') {
		fs.readFile("random.txt", "utf8", function(error, data) {

			if (error) {
				return console.log('Error occurred: ' + error);
			}

			var dataArr = data.split(",");

			command = dataArr[0];
			argument = dataArr[1];

			execute(command, argument);
		});

	} else {
		console.log('Error: Invalid command input');
	}
}

//Twitter Command
function myTweets() {

	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {
		screen_name: 'amylicia4',
		count: 20
	};

	console.log('Getting tweets from username: ' + params.screen_name);

	client.get(
	  'statuses/user_timeline', params, function(error, tweets, response) {

		if (error) {
			return console.log('Error occurred: ' + error);
		}
		//Array to push into
		var tweetArray = [];

		for (var i = 0; i < tweets.length; i++) {
			//Data to push into array
			tweetArray.push({
				date: tweets[i].created_at,
				text: tweets[i].text,
			});
		}

		console.log('Twitter Results: ')
		console.log(tweetArray);
	});
}

//Spotify Command
function spotifySong(searchString) {

	console.log('Getting song info for: ' + searchString);
	//Retrieving Spotify keys
	var spotify = new Spotify({
		  id: keys.spotifyKeys.id,
		  secret: keys.spotifyKeys.secret
		});
	//Parameters for the Search
	var params = {
		type: 'track',
		query: searchString,
		limit: 1
	};
	//Search from Node
	spotify.search(params, function(error, data) {

		if (error) {
			return console.log('Error occurred: ' + error);
		}
		//Variable to retrieve data from Spotify
		var topResult = data.tracks.items[0];
		//Song info to display on terminal
		var songInfo = {
			artist: topResult.artists[0].name,
			songName: topResult.name,
			preview_link: topResult.preview_url,
			albumName: topResult.album.name,
		};
		//Display of song
		console.log('Top Spotify Result:')
		console.log(songInfo);
	});
}

//OMDB Command
function movieThis(movieName) {

	console.log('Getting Movie Info for: ' + movieName);

	var apikey = keys.omdbKeys.key

	console.log(apikey);

	requestURL = 'https://www.omdbapi.com/?&t=' + movieName + '&apikey=' + apikey;

	request(requestURL, function(error, response, body) {

		if (error) {
			return console.log(error);

		} else if (!body) {
			return console.log(response.statusCode, response);
		}

		parseBody = JSON.parse(body);

		// console.log(parseBody);

		movieInfo = {
			title: parseBody.Title,
			year: parseBody.Year,
			imdbRating: parseBody.imdbRating,
			rottenTomatoesRating: parseBody.Ratings[1].Value,
			countryOfOrigin: parseBody.Country,
			language: parseBody.Language,
			plot: parseBody.Plot,
			actors: parseBody.Actors
		}

		console.log(movieInfo);
	});
}