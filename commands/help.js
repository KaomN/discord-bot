/*
!help command displays all command's name and description
Accepts 1 argument in format: <commandname>
*/
const { codeBlock } = require("@discordjs/builders");
exports.run = (message, args, client) => {
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
			output += "\u001b[1;32m!" + `${command.help.name}` + "\u001b[0m :: " + `\u001b[1;37m${command.help.description}\n` + "  " + `\u001b[1;31musage:\u001b[0m \u001b[1;32m${command.help.usage}\u001b[0m\n\n`;
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
			message.channel.send(codeBlock("ansi", `\u001b[1;34m= ${command.help.name} = \u001b[0m\n${command.help.description}\n\u001b[1;31musage :: ${command.help.usage}\n`));
		}
		else
			return message.channel.send("No command with that name");
		}
};

exports.help = {
	name: "help",
	description: "Displays all commands.",
	usage: "\u001b[1;32m!help \u001b[1;37m| \u001b[1;32m!help \u001b[1;33m[command]\u001b[0m"
};