/*
	!roll returns a random value between 1-100 max inclusive.
	Accepts 1 argument in format: <x-y> where x and y is min and max respectively.
	min >= 1 && max <= Number.MAX_SAFE_INTEGER
*/
const crypto = require("crypto");
const devices = require("../modules/device.js");
const { codeBlock } = require("@discordjs/builders");

function getRandomIntBetween(min, max) {
	return crypto.randomInt(min, max + 1)
	//return Math.floor(Math.random() * (max - min + 1) + min);
}
// Returns a random value between 1 and input max(inclusive).
function getRandomInt(max) {
	return crypto.randomInt(1, max + 1)
	//return Math.floor(Math.random() * (max)) + 1;
}
// Returns a random value between 1 and 100.
function getRandomInt100() {
	return crypto.randomInt(1, 101);
	//return Math.floor(Math.random() * (100)) + 1;
}
// Check if value is a number
function isNum(val){
	return !isNaN(val);
}
// Check if value is an integer
function isInt(val) {
	return val % 1 === 0;
}
// Calculate colors for the roll
function calcColors(min, max, val, device) {
	if (device.mobile)
	{
		return ("");
	}
	else if (device.web || device.desktop)
	{
		var total = max - min + 1;
		if (total === 1)
		{
			return "\u001b[0;36m";
		}
		else if (total === 2)
		{
			if (val === 1)
				return "\u001b[0;31m";
			else
				return "\u001b[0;36m";
		}
		else
		{
			Math.ceil(total = total / 3);
			if (val <= total)
				return ("\u001b[0;31m");
			else if (val > total && val <= total * 2)
				return ("\u001b[0;33m");
			else
				return ("\u001b[0;36m");
		}
	}
	else
	{
		return ("");
	}
}
// Main function
function roll(message, args, device) {
	if (device.mobile)
	{
		var green = "";
		var cyan = "";
		var white = "";
		var yellow = "";
		var content = "css";
	}
	else if (device.web || device.desktop)
	{
		var green = "\u001b[0;32m";
		var cyan = "\u001b[0;36m";
		var white = "\u001b[0;37m";
		var yellow = "\u001b[0;33m";
		var content = "ansi";
	}
	else
	{
		var green = "";
		var cyan = "";
		var white = "";
		var yellow = "";
		var content = "css";
	}
	var val;
	if (args.length === 1)
	{
		const num = args[0].split("-");
		// Check if there is one number as an argument
		if (num.length === 1)
		{
			// Check if valid number
			if (isNum(num[0]) && isInt(num[0]))
			{
				const num1 = parseInt(num[0], 10);
				// Check if valid number
				if (num1 != 0 && num[0][0] != '0' && num1 <= Number.MAX_SAFE_INTEGER && num[0][0] != '+')
				{
					val = getRandomInt(num1);
					message.channel.send(codeBlock(content, `${white}${message.author.username }${green} rolls ${calcColors(1, num1, val, device)}${val} ${white}(${cyan}1${white}-${cyan}${num1}${white})`));
				}
			}
		}
		// Check if there is two numbers as an argument
		else if (num.length === 2 && isInt(num[0]) && isInt(num[1]))
		{
			// Check if valid numbers
			if (isNum(num[0]) && isNum(num[1]) && num[0][0] != '-' && num[0][0] != '+' && num[1][0] != '-' && num[1][0] != '+')
			{
				const num1 = parseInt(num[0], 10);
				const num2 = parseInt(num[1], 10);
				// Check if valid numbers
				if (num2 >= num1 && num[0][0] != '0' && num[1][0] != '0' && num1 <= Number.MAX_SAFE_INTEGER && num2 <= Number.MAX_SAFE_INTEGER)
				{
					val = getRandomIntBetween(num1, num2);
					message.channel.send(codeBlock(content, `${white}${message.author.username}${green} rolls ${calcColors(num1, num2, val, device)}${val} ${white}(${cyan}${num1}${white}-${cyan}${num2}${white})`));
				}
			}
		}
	}
	//if there is no argument roll from 1-100
	else if (args.length < 1)
	{
		val = getRandomInt100();
		if (val === 100)
			message.channel.send(codeBlock(content,`${white}${message.author.username}${green} rolls ${yellow}✵${green}100${yellow}✵ ${white}(${cyan}1${white}-${cyan}100${white})`));
		else
			message.channel.send(codeBlock(content,`${white}${message.author.username}${green} rolls ${calcColors(1, 100, val, device)}${val} ${white}(${cyan}1${white}-${cyan}100${white})`));
	}
}

// When the command is called
exports.run = (message, args) => {
	const device = devices.getDevices(message);
	roll(message, args, device);
};

exports.help = {
	name: "roll",
	description: "\u001b[0;37mReturns a random value between 1-100 min and max inclusive.",
	usage: "\u001b[0;37m!\u001b[0;32mroll \u001b[0;37m| !\u001b[0;32mroll \u001b[0;33m[max] \u001b[0;37m| !\u001b[0;32mroll \u001b[0;33m[min-max]"
};

exports.helpMobile = {
	name: "roll",
	description: "Returns a random value between 1-100 min and max inclusive.",
	usage: "!roll | !roll [max] | !roll [min-max]"
};