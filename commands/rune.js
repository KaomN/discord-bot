/*
	!rune [arg] sends a message on what gem is needed to upgrade to the next rune
*/
const { codeBlock } = require("@discordjs/builders");
const { white, yellow, noColor } = require("../helpers/colors.js");
const runes = [	"El", "Eld", "Tir", "Nef", "Eth", "Ith", "Tal", "Ral", "Ort",
				"Thul", "Amn", "Sol", "Shael", "Dol", "Hel", "Io", "Lum", "Ko",
				"Fal", "Lem", "Pul", "Um", "Mal", "Ist", "Gul", "Vex", "Ohm",
				"Lo", "Sur", "Ber", "Jah", "Cham", "Zod"];
const gems = ["Topaz", "Amethyst", "Sapphire", "Ruby", "Emerald", "Diamond"];

// Get the gem in array
function getGem(index) {
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
function getGemQuality(index) {
	if (index >= 9 && index <= 14)
		return "Chipped";
	else if (index >= 15 && index <= 20)
		return "Flawed";
	else if (index >= 21 && index <= 26)
		return "";
	else if (index >= 27 && index <= 32)
		return "Flawless";
}
// Get gem color
function getGemColor(gemIndex) {
	if (gemIndex === 0)
		return "\u001b[0;33m";
	else if (gemIndex === 1)
		return "\u001b[0;35m";
	else if (gemIndex === 2)
		return "\u001b[0;34m";
	else if (gemIndex === 3)
		return "\u001b[0;31m";
	else if (gemIndex === 4)
		return "\u001b[0;32m";
	else if (gemIndex === 5)
		return "\u001b[0;37m";
}
// Main function
function rune(message, args) {
	var content = "ansi";
	if (args[0] == null || args[0] === "list") {
		var list = "\u001b[0;33m";
		var x = 0;
		var y = 17;
		while (x <= 16) {
			if (y == 33)
				list += (x + 1) + ": " + runes[x];
			else {
				if(x < 9)
					list += " ";
				if (runes[x].length == 2)
					list += (x + 1) + ": " + runes[x] + "\t\t " + (y + 1) + ": " + runes[y] + "\n";
				else if (runes[x].length == 4)
					list += (x + 1) + ": " + runes[x] + "\t   " + (y + 1) + ": " + runes[y] + "\n";
				else if (runes[x].length == 5)
					list += (x + 1) + ": " + runes[x] + "\t  " + (y + 1) + ": " + runes[y] + "\n";
				else
					list += (x + 1) + ": " + runes[x] + "\t\t" + (y + 1) + ": " + runes[y] + "\n";
			}
			x++;
			y++;
		}
		message.channel.send(codeBlock(content, `${list}`));
	}
	else if (args[0] != null) {
		// Get the rune in array
		const index = runes.findIndex(element => {
			return element.toLowerCase() === args[0].toLowerCase();
		});
		// Get the gem in array
		const gemIndex = getGem(index);

		// index 0-19 = 3 runes 20 and above = 2 runes Max 31 index
		// index 9 and above needs gems
		if (index >= 0 && index <= 19) {
			if (index < 9)
				message.channel.send(codeBlock(content,`${white}3 ${yellow}${runes[index]}${noColor} → ${white}1 ${yellow}${runes[index + 1]}`));
			else
				message.channel.send(codeBlock(content,`${white}3 ${yellow}${runes[index]} ${noColor}${getGemQuality(index)} ${getGemColor(gemIndex)}${gems[gemIndex]}${noColor} → ${white}1 ${yellow}${runes[index + 1]}`));
		}
		else if (index > 19 && index < 32) {
			// runes # 21-26 does not have a gem quality
			if (getGemQuality(index) == "")
				message.channel.send(codeBlock(content,`${white}2 ${yellow}${runes[index]} ${getGemColor(gemIndex)}${gems[gemIndex]}${noColor} → ${white}1 ${yellow}${runes[index + 1]}`));
			else
				message.channel.send(codeBlock(content,`${white}2 ${yellow}${runes[index]} ${noColor}${getGemQuality(index)} ${getGemColor(gemIndex)}${gems[gemIndex]}${noColor} → ${white}1 ${yellow}${runes[index + 1]}`));
		}
		else
			return;
	}
	return;
}

// When the command is called
exports.run = (message, args) => {
	rune(message, args)
}

exports.help = {
	name: "rune",
	description: "\u001b[0;37mShows what gem is needed to upgrade to the next rune, or list to list runes",
	usage: "\u001b[0;37m!\u001b[0;32mrune \u001b[0;33m[runename]\u001b[0m \u001b[0;37m| !\u001b[0;32mrune \u001b[0;33m[list]"
};
