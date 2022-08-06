// Returns a random integer between min(inclusive) and max(inclusive max).
// min >= 1 && max <= Number.MAX_SAFE_INTEGER
function getRandomIntBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
// Returns a random integer between 1 and input max(inclusive).
function getRandomInt(max) {
	return Math.floor(Math.random() * (max)) + 1;
}
// Returns a random integer between 1 and 100.
function getRandomInt100() {
	return Math.floor(Math.random() * (100)) + 1;
}
// Check if value is a number
function isNum(val){
	return !isNaN(val);
}
// Check if value is an integer
function isInt(val) {
	return val % 1 === 0;
 }

export function roll(arr, message) {
	if (arr.length === 2)
	{
		const num = arr[1].split("-");
		if (num.length === 1)
		{
			if (isNum(num[0]) && isInt(num[0]))
			{
				const num1 = parseInt(num[0], 10);
				if (num1 != 0 && num[0][0] != '0' && num1 <= Number.MAX_SAFE_INTEGER && num[0][0] != '+')
					message.channel.send("```css\n" + message.author.username + " rolls " + "" + getRandomInt(num1) + " (1-" + num1 + ")" + "```");
			}
		}
		else if (num.length === 2 && isInt(num[0]) && isInt(num[1]))
		{
			if (isNum(num[0]) && isNum(num[1]) && num[0][0] != '-' && num[0][0] != '+' && num[1][0] != '-' && num[1][0] != '+')
			{
				const num1 = parseInt(num[0], 10);
				const num2 = parseInt(num[1], 10);
				if (num2 >= num1 && num[0][0] != '0' && num[1][0] != '0' && num1 <= Number.MAX_SAFE_INTEGER && num2 <= Number.MAX_SAFE_INTEGER)
					message.channel.send("```css\n" + message.author.username + " rolls " + "" + getRandomIntBetween(num1, num2) + " (" + num1 + "-" + num2 + ")" + "```");
			}
		}
	}
	else if (arr.length < 2)
		message.channel.send("```css\n" + message.author.username + " rolls " + "" + getRandomInt100() + " (1-100)" + "```");
 }