/*
	Sets bots activity/status.
	1st argument is activity type or status, 2nd argument is the type, 3rd and above is the custom string added to the end of the activity.
	!set [activity/status] [playing/listening/watching/custom] [string].
*/

const devices = require("../modules/device.js");
const { codeBlock } = require("@discordjs/builders");

// When the command is called
exports.run = (message, args, client) => {
	var name = args.slice(2).join(" ");
	if (args[0].toLowerCase() == "status")
	{
		if (args[1].toLowerCase() == "dnd")
			client.user.setPresence({ status: 'dnd' });
		else if (args[1].toLowerCase() == "online")
			client.user.setPresence({ status: 'online' });
		else if (args[1].toLowerCase() == "idle")
			client.user.setPresence({ status: 'idle' });
		else
		message.channel.send("You wot m8?");
	}
	else if (args[0].toLowerCase() == "activity")
	{
		if (args[1].toLowerCase() == "playing")
			client.user.setPresence({ activities: [{ name: `${name}`, type: 0 }] });
		else if (args[1].toLowerCase() == "listening")
			client.user.setPresence({ activities: [{ name: `${name}`, type: 2 }] });
		else if (args[1].toLowerCase() == "watching")
			client.user.setPresence({ activities: [{ name: `${name}`, type: 3 }] });
		else if (args[1].toLowerCase() == "streaming")
			client.user.setPresence({ activities: [{ name: `${name}`, type: 1}] });
		else if (args[1].toLowerCase() == "competing")
			client.user.setPresence({ activities: [{ name: `${name}`, type: 5 }] });
	}
	else
		message.channel.send("You wot m8?");
}

exports.help = {
	name: "set",
	description: "\u001b[0;37mSets bot activity/status.",
	usage: "\u001b[0;32m!set \u001b[0;33m[activity] \u001b[0;33m[playing/streaming/listening/watching/competing] \u001b[0;33m[string]\n\t\t\ \u001b[0;32m!set \u001b[0;33m[status] \u001b[0;33m[online/dnd/idle]"
};

exports.helpMobile = {
	name: "set",
	description: "Sets bot activity/status.",
	usage: "!set [activity] [playing/streaming/listening/watching/competing] [string] | !set [status] [online/dnd/idle]"
};