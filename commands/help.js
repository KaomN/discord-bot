/*
	!help command displays all command's name and description
	Accepts 1 argument in format: <commandname>
*/
const { codeBlock } = require("@discordjs/builders");
const devices = require("../modules/device.js");

function messageMobile(message, args, client)
{
	// If no specific command is called, show all commands.
	if (!args[0])
	{
		//Get names of the commands and save them in an array.
		const allCommands = [...client.commands.keys()];
		// Creating the message
		let output = `= Command List =\n`;
		var command;
		// Loop through the array
		allCommands.forEach(c => {
			command = client.commands.get(c)
			// Add to the message for every command
			output += "!" + `${command.helpMobile.name}` + " :: " + `${command.helpMobile.description}\n` + "  " + `usage: ${command.helpMobile.usage}\n\n`;
		});
		message.channel.send(codeBlock("css", output));
	}
	else
	{
		// Show individual commands help.
		let command = args[0];
		if (client.commands.has(command))
		{
			command = client.commands.get(command);
			message.channel.send(codeBlock("css", `= ${command.helpMobile.name} =\n${command.helpMobile.description}\nusage :: ${command.helpMobile.usage}\n`));
		}
		else
			return message.channel.send("No command with that name");
	}
}

function messageDesktop(message, args, client)
{
	// If no specific command is called, show all commands.
	if (!args[0])
	{
		//Get names of the commands and save them in an array.
		const allCommands = [...client.commands.keys()];
		// Creating the message
		let output = `\u001b[1;34m= Command List =\n`;
		var command;
		// Loop through the array
		allCommands.forEach(c => {
			command = client.commands.get(c)
			// Add to the message for every command
			output += "\u001b[1;32m!" + `${command.help.name}` + "\u001b[0m :: " + `\u001b[0;37m${command.help.description}\n` + "  " + `\u001b[0;31musage:\u001b[0m \u001b[0;32m${command.help.usage}\u001b[0m\n\n`;
		});
		message.channel.send(codeBlock("ansi", output));
	}
	else
	{
		// Show individual commands help.
		let command = args[0];
		if (client.commands.has(command))
		{
			command = client.commands.get(command);
			message.channel.send(codeBlock("ansi", `\u001b[0;34m= ${command.help.name} = \u001b[0m\n${command.help.description}\n\u001b[0;31musage :: ${command.help.usage}\n`));
		}
		else
			return message.channel.send("No command with that name");
	}
}
exports.run = (message, args, client) => {
	const device = devices.getDevices(message)
	if (device.web)
		messageDesktop(message, args, client)
	else if (device.mobile)
		messageMobile(message, args, client)
	else if (device.desktop)
		messageDesktop(message, args, client)
	else
		messageMobile(message, args, client)
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