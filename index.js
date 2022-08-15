const { Client, GatewayIntentBits, Collection, Message, MessageEmbed } = require("discord.js");
const dotenv = require('dotenv');
const fs = require("fs");
dotenv.config();
// New Discord Client
const client = new Client({
	// intents/permissions for the bot
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildPresences
	]
});
// Create new collection to store the commands
client.commands = new Collection();
// Read the Files in the Events Directory and filter files that ends with .js
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
// Loop over each file
for (const file of events) {
	// Split the file at its extension and get the event name
	const eventName = file.split(".")[0];
	// Require the file
	const event = require(`./events/${file}`);
	client.on(eventName, event.bind(null, client));
}

const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
// Loop over each file
for (const file of commands) {
	// Get the command name from splitting the file
	const commandName = file.split(".")[0];
	// Require the file
	const command = require(`./commands/${file}`);
	//console.log(`Attempting to load command ${commandName}`);
	// Set the command to the collection
	client.commands.set(commandName, command);
}
// write on stdout/console when bot is logged in
client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.TOKEN);