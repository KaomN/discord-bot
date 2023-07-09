/*
	Shows Diablo 4 World boss next spawn time.
	!boss.
*/
const { codeBlock } = require("@discordjs/builders");
const { getEvents } = require("../helpers/axios.js");
const { yellow, blue } = require("../helpers/colors.js");

exports.run = async (message, args) => {
	var output = ""
	var content = "ansi";

	data = await getEvents()
	var current = new Date()
	current = current.getTime()/1000
	hours = Math.floor((data.boss.expected - current)/3600)
	minutes = Math.floor(((data.boss.expected - current) - (hours*3600))/60)
	seconds = Math.floor(((data.boss.expected - current) - (hours*3600) - (minutes*60)))

	output += `${blue}Next World Boss Spawn: ${yellow}${hours}h ${minutes}m ${seconds}s\n`
	output += `${blue}Boss: ${yellow}${data.boss.expectedName}\n`

	message.channel.send(codeBlock(content, output));
	return;
}

exports.help = {
	name: "boss",
	description: "\u001b[0;37mShows next World boss spawn time.",
	usage: "\u001b[0;37m!\u001b[0;32mboss"
};

exports.helpMobile = {
	name: "boss",
	description: "Shows next World boss spawn time..",
	usage: "!boss"
};