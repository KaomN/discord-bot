const { MessageCollector } = require("discord.js");
const crypto = require("crypto");
const { codeBlock } = require("@discordjs/builders");
const fs = require('fs');

var green = "\u001b[0;32m";
var cyan = "\u001b[0;36m";
var white = "\u001b[0;37m";
var yellow = "\u001b[0;33m";
var blue = "\u001b[0;34m";
var red = "\u001b[0;31m";

// Returns a random value between 1 and input max(inclusive).
function getRandomInt(max) {
	return crypto.randomInt(1, max + 1);
}

// Used for randomizing starting player
function getRandomstart(max) {
	return crypto.randomInt(0, max);
}

// Capitalize first character in a string
function capitalizeWords(arr)
{
	return arr.map(element => {
		return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
	});
}

function roll(message, args, max, start, arrayPlayers, collector)
{
	var lastVal = max;
	max = getRandomInt(parseInt(max));
	// Gets next player
	var next = start + 1
	if (start + 1 == args.length)
		next = 0;
	if (max === 1)
	{
		message.channel.send(codeBlock("ansi",`${white}` + `${arrayPlayers[start]}` + `${green}` + " rolls " + `${cyan}` + `${max}` + " " + `${white}` + "(" + `${cyan}` + "1" + `${white}` + "-" + `${cyan}` + `${lastVal}` + `${white}` + ")" + "\n" + "\t\t  ." + "\n\t\t -|-" + "\n\t\t  |" + "\n\t  .-'~~~`-." + "\n\t.'         `." + "\n\t|  R  I  P  |" + "\n\t|           |" + "\n\t|           |" + "\n  \\\\|           |//"));
		collector.stop();
	}
	else if (message.author.username.toLowerCase() === arrayPlayers[start].toLowerCase())
	{
		message.channel.send(codeBlock("ansi", `${white}` + `${arrayPlayers[start]}` + `${green}` + " rolls " + `${cyan}` + `${max}` + " " + `${white}` + "(" + `${cyan}` + "1" + `${white}` + "-" + `${cyan}` + `${lastVal}` + `${white}` + ")" + "\n" + `${yellow}` + `${arrayPlayers[next]}` + "'s" + `${white}` + " turn to roll!"));
	}
	return max;
}

exports.run = (message, args, client) => {
	// default value for max if there is no argument for max value.
	var max = 10000;
	var users = "";
	var arrayPlayers = [];
	// Capitalize first letter of the players.
	args = capitalizeWords(args);
	// check if there is any numbers for first argument or if it starts with players directly
	if (isNaN(parseInt(args[0])))
	{
		// copy players to new player array
		args.forEach(function(part, index)
		{
			arrayPlayers[index] = this[index];
		}, args);
		// adding colors to playernames
		args.forEach(function(part, index)
		{
			this[index] = green + this[index];
		}, args);
		users = args.join(white + ", ");
	}
	else
	{
		// copy players to new player array
		args.forEach(function(part, index)
		{
			arrayPlayers[index] = this[index];
		}, args);
		// shifts first argument
		arrayPlayers.shift();
		max = args.shift();
		// Adding colors to playernames
		args.forEach(function(part, index)
		{
			this[index] = green + this[index];
		}, args);
		users = args.join(white + ", ");
	}
	// Adding command starter to player array
	arrayPlayers.unshift(message.author.username);
	args.unshift(message.author.username);
	// Randomize who starts
	var start = getRandomstart(args.length);
	// Exit if started with no players
	if (users === "" || arrayPlayers.length === 0)
		return;
	message.channel.send(codeBlock("ansi", `${blue}` + message.author.username + `${white}` + " started a Deathroll 1-" + `${max}` + `${white}` +"\nPlayers: " + `${green}` + message.author.username + `${white}` + ", " + users + "\n" + `${yellow}` + `${arrayPlayers[start]}` + `${white}` + " starts!"))
	const collector = new MessageCollector(message.channel);
	collector.on('collect', message =>
	{
		if (message.content.toLowerCase() == "roll")
		{
			if (message.author.username.toLowerCase() === arrayPlayers[start].toLowerCase())
			{	
				max = roll(message, args, max, start, arrayPlayers, collector);
				start++;
				if (start == arrayPlayers.length)
					start = 0;
			}
			else if (!(arrayPlayers.includes(message.author.username)))
			{
				message.channel.send(codeBlock("ansi", `${white}` + "You cant play in this game " + `${red}` + message.author.username + `${white}` + "!"))
			}
			else
			{
				message.channel.send(codeBlock("ansi", `${white}` + "Wait for your turn " + `${red}` + message.author.username + `${white}` + ", it is " + `${yellow}` + arrayPlayers[start] + "'s " + `${white}` + "turn!"))
			}
		}
		else if (message.content.toLowerCase() == "stop")
		{
			if(arrayPlayers.includes(message.author.username))
			{
				message.channel.send(codeBlock("ansi", "Stopping Deathroll"));
				collector.stop();
			}
			else
				message.channel.send(codeBlock("ansi", `${white}` + "You do not have permission to stop the game " + `${red}` + message.author.username + `${white}` + "!"))
		}
	})
};

exports.help = {
	name: "deathroll",
	description: "\u001b[0;37mStarts a game of deathroll. After starting the game typing roll, rolls a value for you",
	usage: "\u001b[0;32m!deathroll \u001b[0;33m[playerNames] \u001b[0;33m[...] \u001b[0;37m| \u001b[0;32m!deathroll \u001b[0;33m[maxRollValue] \u001b[0;33m[playerNames] \u001b[0;33m[...]\u001b[0m"
};

exports.helpMobile = {
	name: "deathroll",
	description: "Starts a game of deathroll. After starting the game typing roll, rolls a value for you",
	usage: "!deathroll [playerNames] [...] | !deathroll [maxRollValue] [playerNames] [...]"
};