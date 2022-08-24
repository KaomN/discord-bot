module.exports = async (client, message) => {
	const prefix = "!"
	// Ignore messages not starting with the prefix, or from bots
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;
	// Remove the prefix and get the arguments from the message.
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	// Get the command from the args array.
	const command = args.shift().toLowerCase();
	// Grab the command data from the client.commands Enmap
	const cmd = client.commands.get(command);
	// If command doesn't exist, exit and do nothing
	if (!cmd)
		return;
	// Run the command
	try {
		await cmd.run(message, args, client);
	} catch (error) {
		console.log(error);
		message.channel.send({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\`` })
			.catch(e => console.error("An error occurred", e));
	}
};