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

	var lastSpawned = data.helltide.timestamp*1000
	var hour = 3600000 // 1 hour
	var deSpawned = lastSpawned + hour // despawn in 1 hour
	var spawn = 8100000 // 2 hours 15 minutes
	var current = new Date()
	current = current.getTime()
	if (deSpawned > current) {
		var nextSpawn = new Date(lastSpawned + spawn)
		var nextHours = Math.floor((nextSpawn - current)/3600000)
		var nextMinutes = Math.floor(((nextSpawn - current) - (nextHours*3600000))/60000)
		var nextSeconds = Math.floor(((nextSpawn - current) - (nextHours*3600000) - (nextMinutes*60000))/1000)
		var minutes = Math.floor(((deSpawned - current))/60000)
		var seconds = Math.floor(((deSpawned - current) - (minutes*60000))/1000)
		output += `${blue}Helltide event ongoing: ${yellow} ${minutes}m ${seconds}s left!\n`
		output += `${blue}Next Helltide Spawn: ${yellow}${nextHours}h ${nextMinutes}m ${nextSeconds}s\n`

		message.channel.send(codeBlock(content, output));
		return;
	}
	else {
		var nextSpawn = new Date(lastSpawned + spawn)
		var nextHours = Math.floor((nextSpawn - current)/3600000)
		var nextMinutes = Math.floor(((nextSpawn - current) - (nextHours*3600000))/60000)
		var nextSeconds = Math.floor(((nextSpawn - current) - (nextHours*3600000) - (nextMinutes*60000))/1000)
		output += `${blue}Next Helltide Spawn: ${yellow}${nextHours}h ${nextMinutes}m ${nextSeconds}s\n`

		message.channel.send(codeBlock(content, output));
		return;
	}
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