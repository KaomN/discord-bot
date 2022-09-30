/*
	!deathroll Starts a game of deathroll. After starting the game typing roll, rolls a value for you.
	-r argument chooses rolling players randomly
*/
const { MessageCollector } = require("discord.js");
const crypto = require("crypto");
const { codeBlock } = require("@discordjs/builders");

var green = "\u001b[0;32m";
var cyan = "\u001b[0;36m";
var white = "\u001b[0;37m";
var yellow = "\u001b[0;33m";
var blue = "\u001b[0;34m";
var red = "\u001b[0;31m";
var noColor = "\u001b[0m";

var turn = {next: 0, start:0, max: 0};

// Returns a random value between 1 and input max(inclusive).
function getRandomInt(max) {
	return crypto.randomInt(1, max + 1);
	//return Math.floor(Math.random() * (max)) + 1;
}

// Used for randomizing starting player
function getRandomstart(max) {
	return crypto.randomInt(0, max);
	//return Math.floor(Math.random() * max);
}

// Capitalize first character in a string
function capitalizeWords(arr)
{
	return arr.map(element => {
		return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
	});
}

function roll(message, args, turn, arrayPlayers, collector, randomMode) {
	var lastVal = turn.max;
	turn.max = getRandomInt(parseInt(turn.max));
	// Gets next player
	if (randomMode === 1)
		turn.next = getRandomstart(args.length);
	else
	{
		turn.next = turn.start + 1
		if (turn.start + 1 == args.length)
		turn.next = 0;
	}
	if (turn.max === 1)
	{
		message.channel.send(codeBlock("ansi", `${white}${arrayPlayers[turn.start]}${green} rolls ${cyan}${turn.max} ${white}(${cyan}1${white}-${cyan}${lastVal}${white})\n${yellow}\t\t  .\n\t\t -|-\n\t\t  |${noColor}\n\t  .-'~~~'-.\n\t.'         '.\n\t|${white}   R.I.P   ${noColor}|\n\t|           |\n\t|           |${green}\n  \\\\${noColor}|           |${green}//`));
		collector.stop();
	}
	else if (message.author.username.toLowerCase() === arrayPlayers[turn.start].toLowerCase())
	{
		message.channel.send(codeBlock("ansi", `${white}${arrayPlayers[turn.start]}${green} rolls ${cyan}${turn.max} ${white}(${cyan}1${white}-${cyan}${lastVal}${white})\n${yellow}${arrayPlayers[turn.next]}'s${white} turn to roll!`));
	}
	return turn;
}

function startMessageCollector(message, args, turn, arrayPlayers, randomMode) {
	const collector = new MessageCollector(message.channel);
	collector.on('collect', message =>
	{
		if (message.content.toLowerCase() == "roll")
		{
			if (message.author.username.toLowerCase() === arrayPlayers[turn.start].toLowerCase())
			{	
				turn = roll(message, args, turn, arrayPlayers, collector, randomMode);
				if (randomMode === 1)
					turn.start = turn.next;
				else
				{
					turn.start++;
					if (turn.start == arrayPlayers.length)
					turn.start = 0;
				}
			}
		}
		else if (message.content.toLowerCase() == "stop")
		{
			if(arrayPlayers.includes(message.author.username))
			{
				message.channel.send(codeBlock("ansi", `Stopping Deathroll`));
				collector.stop();
			}
		}
	})
}

exports.run = (message, args) => {
	// default value for max if there is no argument for max value.
	turn.max = 10000;
	var users = "";
	var arrayPlayers = [];
	var randomMode = 0;
	// Capitalize first letter of the players.
	args = capitalizeWords(args);
	// check if there is any numbers for first argument or if it starts with players directly
	var index = args.indexOf("-r");
	if (index > -1)
	{
		randomMode = 1;
		args.splice(index, 1);
	}
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
		turn.max = args.shift();
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
	turn.start = getRandomstart(args.length);
	// Exit if started with no players
	if (users === "" || arrayPlayers.length === 0)
		return;
	if (randomMode === 1)
		message.channel.send(codeBlock("ansi", `${blue}${message.author.username}${white} started a Deathroll random mode (${cyan}1${white}-${cyan}${turn.max}${white})\nPlayers: ${green}${message.author.username}${white}, ${users}\n${yellow}${arrayPlayers[turn.start]}${white} starts!`));
	else
		message.channel.send(codeBlock("ansi", `${blue}${message.author.username}${white} started a Deathroll (${cyan}1${white}-${cyan}${turn.max}${white})\nPlayers: ${green}${message.author.username}${white}, ${users}\n${yellow}${arrayPlayers[turn.start]}${white} starts!`));
	startMessageCollector(message, args, turn, arrayPlayers, randomMode);
};

exports.help = {
	name: "deathroll",
	description: "\u001b[0;37mStarts a game of deathroll. After starting the game typing roll, rolls a value for you. -r argument chooses random rolling players",
	usage: "\u001b[0;37m!\u001b[0;32mdeathroll \u001b[0;33m[playerNames] \u001b[0;33m[...] \u001b[0;37m| \u001b[0;37m!\u001b[0;32mdeathroll \u001b[0;33m[args] \u001b[0;33m[playerNames] \u001b[0;33m[...] \u001b[0;37m| !\u001b[0;32mdeathroll \u001b[0;33m[maxRollValue] \u001b[0;33m[playerNames] \u001b[0;33m[...] \u001b[0;37m| !\u001b[0;32mdeathroll \u001b[0;33m[args] \u001b[0;33m[maxRollValue] \u001b[0;33m[playerNames] \u001b[0;33m[...]"
};

exports.helpMobile = {
	name: "deathroll",
	description: "Starts a game of deathroll. After starting the game typing roll, rolls a value for you. -r argument chooses random rolling players",
	usage: "!deathroll [playerNames] [...] | !deathroll [args] [playerNames] [...] | !deathroll [maxRollValue] [playerNames] [...] | !deathroll [maxRollValue] [args] [playerNames] [...]"
};