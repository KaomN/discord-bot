import { roll } from "./roll.mjs";
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import DiscordJS, { Client, GatewayIntentBits} from "discord.js"
dotenv.config()
const client = new DiscordJS.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
	const command = message.content.split(" ");
	if (command[0] === "!roll" || command[0] === "/roll")
		roll(command, message);
});

client.login(process.env.TOKEN);