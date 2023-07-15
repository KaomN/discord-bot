/*
	Shows Diablo 4 World boss next spawn time.
	!boss.
*/
const { codeBlock } = require("@discordjs/builders");
const { getEvents } = require("../helpers/d4event.js");
const { yellow, blue } = require("../helpers/colors.js");

function calculateTime(current, expected, data) {
	var output = ""
	var hours = Math.floor((expected - current)/3600)
	var minutes = Math.floor(((expected - current) - (hours*3600))/60)
	var seconds = Math.floor(((expected - current) - (hours*3600) - (minutes*60)))

	if (hours == 0 && minutes < 30) {
		output += `${blue}Next World Boss event: ${yellow}${minutes}m ${seconds}s\n`
		output += `${blue}Boss: ${yellow}${data.boss.expectedName}\n`
		output += `${blue}Zone: ${yellow}${data.boss.zone}\n`
		output += `${blue}Location: ${yellow}${data.boss.territory}\n`
	}
	else if (hours == 0 && minutes == 0) {
		output += `${blue}Next World Boss event: ${yellow}$${seconds}s\n`
		output += `${blue}Boss: ${yellow}${data.boss.expectedName}\n`
	}
	else if (hours == 0) {
		output += `${blue}Next World Boss event: ${yellow}${minutes}m ${seconds}s\n`
		output += `${blue}Boss: ${yellow}${data.boss.expectedName}\n`
	}
	else {
		output += `${blue}Next World Boss event: ${yellow}${hours}h ${minutes}m ${seconds}s\n`
		output += `${blue}Boss: ${yellow}${data.boss.expectedName}\n`
	}

	return output
}

exports.run = async (message, args) => {
	var content = "ansi";
	try {
		var data = await getEvents()
		if (data == false || data == undefined) {
			message.channel.send(codeBlock(content, "Error: D4Armory API is not responding."));
		}
		else {
			var current = new Date()
			current = current.getTime()/1000
			output = calculateTime(current, data.boss.expected, data)
			message.channel.send(codeBlock(content, output));
		}
	} catch (error) {
		console.log(error);
	}
}

exports.help = {
	name: "boss",
	description: "\u001b[0;37mShows next World boss spawn time.",
	usage: "\u001b[0;37m!\u001b[0;32mboss"
};