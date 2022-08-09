import crypto from "crypto"
// Returns a random value between min(inclusive) and max(inclusive max).
// min >= 1 && max <= Number.MAX_SAFE_INTEGER
function getRandomIntBetween(min, max) {
	return crypto.randomInt(min, max + 1)
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
// main function
export function roll(command, message) {
	// Check if there is an argument
	if (command.length === 2)
	{
		const num = command[1].split("-");
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
	else if (command.length < 2)
		message.channel.send("```css\n" + message.author.username + " rolls " + "" + getRandomInt100() + " (1-100)" + "```");
}