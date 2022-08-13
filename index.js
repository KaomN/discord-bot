const { Client, GatewayIntentBits, Collection } = require("discord.js");
const dotenv = require('dotenv');
const fs = require("fs");
dotenv.config();
// Assigns prefix
const prefix = "!";
// New Discord Client
const client = new Client({
	// intents/permissions for the bot
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});
client.commands = new Collection();

const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
	const eventName = file.split(".")[0];
	const event = require(`./events/${file}`);
	client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
	// Get the command name from splitting the file
	const commandName = file.split(".")[0];
	// Require the file
	const command = require(`./commands/${file}`);
	//console.log(`Attempting to load command ${commandName}`);
	// Set the command to a collection
	client.commands.set(commandName, command);
}
// write on stdout/console when bot is logged in
client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.TOKEN);