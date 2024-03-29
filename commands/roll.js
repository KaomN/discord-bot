/*
	!roll returns a random value between 1-100 max inclusive.
	Accepts 1 argument in format: <x-y> where x and y is min and max respectively.
	min >= 1 && max <= Number.MAX_SAFE_INTEGER
*/
const crypto = require("crypto");
const { codeBlock } = require("@discordjs/builders");
const modules = require("../modules/modules.js");
const { green, cyan, white, yellow } = require("../helpers/colors.js");

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
function calcColors(min, max, val) {
	var total = max - min + 1;
	if (total === 1) {
		return "\u001b[0;36m";
	}
	else if (total === 2) {
		if (val === 1)
			return "\u001b[0;31m";
		else
			return "\u001b[0;36m";
	}
	else {
		Math.ceil(total = total / 3);
		if (val <= total)
			return ("\u001b[0;31m");
		else if (val > total && val <= total * 2)
			return ("\u001b[0;33m");
		else
			return ("\u001b[0;36m");
	}
}
// Main function
async function roll(message, args) {
	var content = "ansi";
	var val;
	if (args.length === 1) {
		const num = args[0].split("-");
		// Check if there is one number as an argument
		if (num.length === 1) {
			// Check if valid number
			if (isNum(num[0]) && isInt(num[0])) {
				const num1 = parseInt(num[0], 10);
				// Check if valid number
				if (num1 != 0 && num[0][0] != '0' && num1 <= Number.MAX_SAFE_INTEGER && num[0][0] != '+') {
					val = getRandomInt(num1);
					message.channel.send(codeBlock(content, `${white}${modules.getNickname(message)}${green} rolls ${calcColors(1, num1, val)}${val} ${white}(${cyan}1${white}-${cyan}${num1}${white})`));
				}
			}
		}
		// Check if there is two numbers as an argument
		else if (num.length === 2 && isInt(num[0]) && isInt(num[1])) {
			// Check if valid numbers
			if (isNum(num[0]) && isNum(num[1]) && num[0][0] != '-' && num[0][0] != '+' && num[1][0] != '-' && num[1][0] != '+') {
				const num1 = parseInt(num[0], 10);
				const num2 = parseInt(num[1], 10);
				// Check if valid numbers
				if (num2 >= num1 && num[0][0] != '0' && num[1][0] != '0' && num1 <= Number.MAX_SAFE_INTEGER && num2 <= Number.MAX_SAFE_INTEGER) {
					val = getRandomIntBetween(num1, num2);
					message.channel.send(codeBlock(content, `${white}${modules.getNickname(message)}${green} rolls ${calcColors(num1, num2, val)}${val} ${white}(${cyan}${num1}${white}-${cyan}${num2}${white})`));
				}
			}
		}
	}
	//if there is no argument roll from 1-100
	else if (args.length < 1) {
		val = getRandomInt100();
		if (val === 100)
			message.channel.send(codeBlock(content,`${white}${modules.getNickname(message)}${green} rolls ${yellow}✵${green}100${yellow}✵ ${white}(${cyan}1${white}-${cyan}100${white})`));
		else
			message.channel.send(codeBlock(content,`${white}${modules.getNickname(message)}${green} rolls ${calcColors(1, 100, val)}${val} ${white}(${cyan}1${white}-${cyan}100${white})`));
	}
}

// When the command is called
exports.run = (message, args) => {
	roll(message, args);
};

exports.help = {
	name: "roll",
	description: "\u001b[0;37mReturns a random value between 1-100 min and max inclusive.",
	usage: "\u001b[0;37m!\u001b[0;32mroll \u001b[0;37m| !\u001b[0;32mroll \u001b[0;33m[max] \u001b[0;37m| !\u001b[0;32mroll \u001b[0;33m[min-max]"
};