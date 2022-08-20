/*
	!rune [arg] sends a message on what gem is needed to upgrade to the next rune
*/
const { codeBlock } = require("@discordjs/builders");
const devices = require("../modules/device.js");
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
function getGemColor(gemIndex, device)
{
	if (device.mobile)
	{
		return ("");
	}
	else if (device.web || device.desktop)
	{
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
	else
	{
		return ("");
	}
}
// Main function
function rune(message, args, device)
{
	// Initiate variables according to device type
	if (device.mobile)
	{
		var white = "";
		var yellow = "";
		var reset = "";
		var content = "css";
	}
	else if (device.web || device.desktop)
	{
		var white = "\u001b[0;37m";
		var yellow = "\u001b[0;33m";
		var reset = "\u001b[0m";
		var content = "ansi";
	}
	else
	{
		var white = "";
		var yellow = "";
		var content = "css";
		var content = "css";
	}
	if (args[0] === "list")
	{
		var list = "\u001b[0;33m";
		var x = 0;
		var y = 17;
		while (x <= 16)
		{
			if (y == 33)
				list += (x + 1) + ": " + runes[x];
			else
			{
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
	else
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
				message.channel.send(codeBlock(content,`${white}` + "3 " + `${yellow}` + runes[index] + `${reset}` + " → " + `${white}` + "1 " + `${yellow}` + runes[index + 1]));
			else
				message.channel.send(codeBlock(content,`${white}` + "3 " + `${yellow}` + runes[index] + " " + `${reset}` + getGemQuality(index) + " " + `${getGemColor(gemIndex, device)}` + gems[gemIndex] + `${reset}` + " → " + `${white}` + "1 " + `${yellow}` + runes[index + 1]));
		}
		else if (index > 19 && index < 32)
		{
			// runes # 21-26 does not have a gem quality
			if (getGemQuality(index) == "")
				message.channel.send(codeBlock(content,`${white}` + "2 " + `${yellow}` + runes[index] + " " + `${getGemColor(gemIndex, device)}` + gems[gemIndex] + `${reset}` + " → " + `${white}` + "1 " + `${yellow}` + runes[index + 1]));
			else
				message.channel.send(codeBlock(content,`${white}` + "2 " + `${yellow}` + runes[index] + " " + `${reset}` + getGemQuality(index) + " " + `${getGemColor(gemIndex, device)}` + gems[gemIndex] + `${reset}` + " → " + `${white}` + "1 " + `${yellow}` + runes[index + 1]));
		}
		else
			return;
	}
}

// When the command is called
exports.run = (message, args) => {
	device = devices.getDevices(message);
	rune(message, args, device)
}

exports.help = {
	name: "rune",
	description: "\u001b[0;37mShows what gem is needed to upgrade to the next rune.",
	usage: "\u001b[0;32m!rune \u001b[0;33m[runename]\u001b[0m"
};

exports.helpMobile = {
	name: "rune",
	description: "Shows what gem is needed to upgrade to the next rune.",
	usage: "!rune [runename]"
};
