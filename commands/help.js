/*
	!help command displays all command's name and description
	Accepts 1 argument in format: <commandname>
*/
const { codeBlock } = require("@discordjs/builders");
const devices = require("../modules/device.js");
// Main function
function help(message, args, client, device)
{
	// Initiate variables according to device type
	if (device.mobile)
	{
		var green = "";
		var red = "";
		var blue = "";
		var white = "";
		var reset = "";
		var content = "css";
	}
	else if (device.web || device.desktop)
	{
		var green = "\u001b[0;32m";
		var red = "\u001b[0;31m";
		var blue = "\u001b[0;34m";
		var white = "\u001b[0;37m";
		var reset = "\u001b[0m";
		var content = "ansi";
	}
	else
	{
		var green = "";
		var red = "";
		var blue = "";
		var white = "";
		var reset = "";
		var content = "css";
	}
	if (!args[0])
	{
		//Get names of the commands and save them in an array.
		const allCommands = [...client.commands.keys()];
		// Creating the message
		let output = `${blue}` + "\t= Command List =\n";
		var command;
		// Loop through the array
		allCommands.forEach(c => {
			command = client.commands.get(c)
			// Add to the message for every command
			output += `${blue}` + "!" + `${command.help.name}` + `${reset}` + " :: " + `${white}` +`${command.help.description}` + "\n" + "  " + `${red}` + "usage" + `${reset}` +": " + `${green}` + `${command.help.usage}\n\n`;
		});
		message.channel.send(codeBlock(content, output));
	}
	else
	{
		// Show individual commands help.
		let command = args[0];
		if (client.commands.has(command))
		{
			command = client.commands.get(command);
			message.channel.send(codeBlock(content, `${blue}` + `= ${command.help.name} =` + `\n${command.help.description}\n` `${red}` + "usage " + `${reset}` + ":: " + `${command.help.usage}\n`));
		}
		else
			return message.channel.send(codeBlock(content,"No command with that name"));
	}
}
// When the command is called
exports.run = (message, args, client) => {
	const device = devices.getDevices(message);
	help(message, args, client, device);
};

exports.help = {
	name: "help",
	description: "\u001b[0;37mDisplays all commands.",
	usage: "\u001b[0;32m!help \u001b[0;37m| \u001b[0;32m!help \u001b[0;33m[command]\u001b[0m"
};

exports.helpMobile = {
	name: "help",
	description: "Displays all commands.",
	usage: "!help | !help [command]"
};