const { Client, GatewayIntentBits, Collection } = require("discord.js");
const dotenv = require('dotenv');
const fs = require("fs");
dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildPresences
	]
});

function init() {
	// Create new collection to store the commands
	client.commands = new Collection();
	// Bind events
	const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
	for (const file of events) {
		const eventName = file.split(".")[0];
		const event = require(`./events/${file}`);
		client.on(eventName, event.bind(null, client));
	}
	// Add custom commands to collection
	const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
	for (const file of commands) {
		const commandName = file.split(".")[0];
		const command = require(`./commands/${file}`);
		console.log(`Attempting to load command !${commandName}`);
		client.commands.set(commandName, command);
	}

	// write on stdout/console when bot is logged in
	client.on("ready", () =>{
		console.log("Ready! Logged in as " + client.user.username);
		client.user.setPresence({
			activities:
			[
				{ name: `Krixxan`,  type: 2 },
			],
			status: 'online'
		});
	});
	client.login(process.env.TOKEN);
}

init();