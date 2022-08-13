module.exports = (client, message) => {
	const prefix = "!"
	// Ignore all bots
	if (message.author.bot)
		return;
	// Ignore messages not starting with the prefix
	if (!message.content.startsWith(prefix))
		return;
	// Remove the prefix and get the arguments form the message.
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	// Get the command from the args array.
	const command = args.shift().toLowerCase();
	// Grab the command data from the client.commands Enmap
	const cmd = client.commands.get(command);
	// If command doesn't exist, exit and do nothing
	if (!cmd) return;
	// Run the command
	try {
		cmd.run(message, args);
	} catch (error) {
		console.log(error);
		message.channel.send({ content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\`` })
			.catch(e => console.error("An error occurred", e));
	}
};