// !roll returns a random value between 1-100 max inclusive.
// Accepts 1 argument in format: <x-y> where x and y is min and max respectively.
// min >= 1 && max <= Number.MAX_SAFE_INTEGER
const crypto = require("crypto");
const { codeBlock } = require("@discordjs/builders");
function getRandomIntBetween(min, max) {
	return crypto.randomInt(min, max + 1)
	//return Math.floor(Math.random() * (max - min + 1) + min);
}
// Returns a random value between 1 and input max(inclusive).
function getRandomInt(max) {
	return crypto.randomInt(1, max + 1)
}
// Returns a random value between 1 and 100.
function getRandomInt100() {
	return crypto.randomInt(1, 101);
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
function calcColors(min, max, val)
{
	var total = max - min + 1;
	if (total === 1)
	{
		return 36;
	}
	else if (total === 2)
	{
		if (val === 1)
			return 31;
		else
			return 36;
	}
	else
	{
		Math.ceil(total = total / 3);
		if (val <= total)
			return (31);
		else if (val > total && val <= total * 2)
			return (33);
		else
			return (36);
	}
}
// Main function
exports.run = (message, args) => {
	// Check if there is an argument
	var val
	var test = 31
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
					message.channel.send(codeBlock("ansi", message.author.username + " \u001b[0;32mrolls " + `\u001b[0;${calcColors(1, num1, val)}m` + val + " \u001b[0m(\u001b[0;36m1\u001b[0m-" + "\u001b[0;36m" + num1 + "\u001b[0m)"));
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
					message.channel.send(codeBlock("ansi", message.author.username + " \u001b[0;32mrolls " + `\u001b[0;${calcColors(num1, num2, val)}m` + val + " \u001b[0m(" + "\u001b[0;36m" + num1 + "\u001b[0m-" + "\u001b[0;36m" + num2 + "\u001b[0m)"));
				}
			}
		}
	}
	//if there is no argument roll from 1-100
	else if (args.length < 1)
	{
		val = getRandomInt100();
		if (val === 100)
			message.channel.send(codeBlock("ansi", message.author.username + " \u001b[0;32mrolls " + "\u001b[0;33m✵\u001b[0;32m100\u001b[0;33m✵" + " \u001b[0m(\u001b[0;36m1\u001b[0m-\u001b[0;36m100\u001b[0m)"));
		else
			message.channel.send(codeBlock("ansi", message.author.username + " \u001b[0;32mrolls " + `\u001b[0;${calcColors(1, 100, val)}m` + val + " \u001b[0m(\u001b[0;36m1\u001b[0m-\u001b[0;36m100\u001b[0m)"));
	}
}
//`\u001b[1;${test}m`
exports.help = {
	name: "roll",
	description: "Returns a random value between 1-100 min and max inclusive.",
	usage: "\u001b[0;32m!roll\u001b[0;37m | \u001b[0;32m!roll \u001b[0;33m[max] \u001b[0;37m| \u001b[0;32m!roll \u001b[0;33m[min-max]"
};