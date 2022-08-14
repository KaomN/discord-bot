/* !rune [arg] sends a message on what gem is needed to upgrade to the next rune */
const { codeBlock } = require("@discordjs/builders");
const runes = [	"El", "Eld", "Tir", "Nef", "Eth", "Ith", "Tal", "Ral", "Ort",
				"Thul", "Amn", "Sol", "Shael", "Dol", "Hel", "Io", "Lum", "Ko",
				"Fal", "Lem", "Pul", "Um", "Mal", "Ist", "Gul", "Vex", "Ohm",
				"Lo", "Sur", "Ber", "Jah", "Cham", "Zod"];
const gems = ["Topaz", "Amethyst", "Sapphire", "Ruby", "Emerald", "Diamond"];
const gemQuality = ["Chipped", "Flawed", "", "Flawless"];
// Get the gem in array
function getGem (index) {
	if (index >= 9 && index <= 14)
		return index - 9;
	else if (index >= 15 && index <= 20)
		return index - 15;
	else if (index >= 21 && index <= 26)
		return index - 21;
	else if (index >= 27 && index <= 32)
		return index - 27;
}
// Get the gem quality in array
function getGemQuality (index) {
	if (index >= 9 && index <= 14)
		return 0;
	else if (index >= 15 && index <= 20)
		return 1;
	else if (index >= 21 && index <= 26)
		return 2;
	else if (index >= 27 && index <= 32)
		return 3;
}
// Get gem color
function getGemColor(gemIndex)
{
	if (gemIndex === 0)
		return 33;
	else if (gemIndex === 1)
		return 35;
	else if (gemIndex === 2)
		return 34;
	else if (gemIndex === 3)
		return 31;
	else if (gemIndex === 4)
		return 32;
	else if (gemIndex === 5)
		return 37;
}
//Main function
exports.run = (message, args) => {
	// Check if there is an argument
	if (args.length === 1)
	{
		// Get the rune in array
		const index = runes.findIndex(element => {
			return element.toLowerCase() === args[0].toLowerCase();
		});
		// Get the gem in array
		const gemIndex = getGem(index);
		// Get the gem quality in array
		const gemQualityIndex = getGemQuality(index);
		// index 0-19 = 3 runes 20 and above = 2 runes Max 31 index
		// index 9 and above needs gems
		if (index >= 0 && index <= 19)
		{
			if (index < 9)
				message.channel.send(codeBlock("ansi", "3 \u001b[1;33m" + runes[index] + "\u001b[0m → 1 \u001b[1;33m" + runes[index + 1]));
			else
				message.channel.send(codeBlock("ansi", "3 \u001b[1;33m" + runes[index] + "\u001b[0m + " + gemQuality[gemQualityIndex] + " " + `\u001b[1;${getGemColor(gemIndex)}m` + gems[gemIndex] + "\u001b[0m → 1 \u001b[1;33m" + runes[index + 1]));
		}
		else if (index > 19 && index < 32)
		{
			// runes # 21-26 does not have a gem quality
			if (gemQualityIndex == 2)
				message.channel.send(codeBlock("ansi", "2 \u001b[1;33m" + runes[index] + "\u001b[0m + " + `\u001b[1;${getGemColor(gemIndex)}m` + gems[gemIndex] + "\u001b[0m → 1 \u001b[1;33m" + runes[index + 1]));
			else
				message.channel.send(codeBlock("ansi", "2 \u001b[1;33m" + runes[index] + "\u001b[0m + " + gemQuality[gemQualityIndex] + " " + `\u001b[1;${getGemColor(gemIndex)}m` + gems[gemIndex] + "\u001b[0m → 1 \u001b[1;33m" + runes[index + 1]));
		}
		// if rune is not found exit silently
		else
			return;
	}
}

exports.help = {
	name: "rune",
	description: "Shows what gem is needed to upgrade to the next rune.",
	usage: "!rune \u001b[1;33m[runename]\u001b[0m"
};