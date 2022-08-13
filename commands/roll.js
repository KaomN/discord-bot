// !Roll returns a random value between 1-100 max inclusive.
// Accepts 1 argument in format: x-y where x and y is min and max respectively.
// min >= 1 && max <= Number.MAX_SAFE_INTEGER
const crypto = require("crypto");

function getRandomIntBetween(min, max) {
	return crypto.randomInt(min, max + 1)
	//return Math.floor(Math.random() * (max - min + 1) + min);
}
// Returns a random value between 1 and input max(inclusive).
function getRandomInt(max) {
	return crypto.randomInt(max + 1)
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
// main function
exports.run = (message, args) => {
	// Check if there is an argument
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
					message.channel.send("```css\n" + message.author.username + " rolls " + "" + getRandomInt(num1) + " (1-" + num1 + ")" + "```");
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
					message.channel.send("```css\n" + message.author.username + " rolls " + "" + getRandomIntBetween(num1, num2) + " (" + num1 + "-" + num2 + ")" + "```");
			}
		}
	}
	//if there is no argument roll from 1-100
	else if (args.length < 1)
		message.channel.send("```css\n" + message.author.username + " rolls " + "" + getRandomInt100() + " (1-100)" + "```");
}

//exports.name = "roll";