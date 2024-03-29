/*
	!help command displays all command's name and description
	Accepts 1 argument in format: <commandname>
*/
const { codeBlock } = require("@discordjs/builders");
const { green, red, blue, white, noColor } = require("../helpers/colors.js");
// Main function
function help(message, args, client) {
	var content = "ansi";
	if (!args[0]) {
		//Get names of the commands and save them in an array.
		const allCommands = [...client.commands.keys()];
		// Creating the message
		var output = `${blue}` + "\t= Command List =\n";
		// Loop through the array
		allCommands.forEach(c => {
			var command = client.commands.get(c)
			// Add to the message for every command
			output += `${blue}!${command.help.name}${noColor} :: ${white}${command.help.description}\n  ${red}usage${noColor}: ${green}${command.help.usage}\n\n`;
		});
		message.channel.send(codeBlock(content, output));
	}
	else {
		// Show individual commands help.
		var command = args[0];
		if (client.commands.has(command)) {
			command = client.commands.get(command);
			message.channel.send(codeBlock(content, `${blue}= ${command.help.name} =\n${command.help.description}\n${red}usage ${noColor}:: ${command.help.usage}\n`));
		}
		else
			return message.channel.send(codeBlock(content,"No command with that name"));
	}
}
// When the command is called
exports.run = (message, args, client) => {
	help(message, args, client);
};

exports.help = {
	name: "help",
	description: "\u001b[0;37mDisplays all commands.",
	usage: "\u001b[0;37m!\u001b[0;32mhelp \u001b[0;37m| !\u001b[0;32mhelp \u001b[0;33m[command]"
};