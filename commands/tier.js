/*
	Shows Diablo 4 NM dungeon tier.
	1st argument is dungoen name or list to get a list of dungeons.
	!tier [dungeon_name/list].
*/
const { codeBlock } = require("@discordjs/builders");
const fuzzysort = require("fuzzysort");
const { green, cyan, white, yellow, red, blue } = require("../helpers/colors.js");

const GLOBAL_TIER_LIST = [
	"Blind Burrows",
	"Champion's Demise",
	"Earthen Wound",
	"Renegade's Retreat",
	"Sunken Ruins",
	"Aldurwood",
	"Guulrahn Canals",
	"Kor Dragan Baracks",
	"Maugan's Works",
	"Maulwood",
	"Raethwind Wilds",
	"Serpent's Lair",
	"Ancient's Lament",
	"Crusaders' Cathedral",
	"Dark Ravine",
	"The Onyx Hold",
	"Shivta Ruins",
	"Witchwater",
	"Abandoned Mineworks",
	"Cultist Refuge",
	"Demon's Wake",
	"Lost Archives",
	"Prison of Caldeum",
	"Whispering Pines",
	"Zenith",
	"Ferals' Den",
	"Guulrahn Slums",
	"Shadowed Plunge",
	"Conclave",
	"Black Asylum"
]

exports.run = (message, args) => {
	var output = ""
	var content = "ansi";
	var search_word = args[0];
	if (!search_word || search_word == "list"){
		for (var i = 0; i < GLOBAL_TIER_LIST.length; i++) {
			if (i < 5)
				output += blue + (i + 1) + ": " + GLOBAL_TIER_LIST[i] + "\n";
			else if (i > 4 && i < 19)
				output += green + (i + 1) + ": " + GLOBAL_TIER_LIST[i] + "\n";
			else if (i > 18 && i < 26)
				output += yellow + (i + 1) + ": " + GLOBAL_TIER_LIST[i] + "\n";
			else
				output += red + (i + 1) + ": " + GLOBAL_TIER_LIST[i] + "\n";
		}
		message.channel.send(codeBlock(content, output));
		return;
	}
	else if (args[0] != null) {
		for (var i = 1; i < args.length; i++) {
			search_word += " " + args[i];
		}
		result = fuzzysort.go(search_word, GLOBAL_TIER_LIST);
		var output = ""
		var found_index = null
		if (result.total != 0){
			for (var i = 0; i < result.total; i++) {
				found_index = GLOBAL_TIER_LIST.indexOf(result[i].target);
				if (found_index < 5)
					output += blue + (found_index + 1) + ": " + GLOBAL_TIER_LIST[found_index] + "\n";
				else if (found_index > 4 && found_index < 19)
					output += green + (found_index + 1) + ": " + GLOBAL_TIER_LIST[found_index] + "\n";
				else if (found_index > 18 && found_index < 26)
					output += yellow + (found_index + 1) + ": " + GLOBAL_TIER_LIST[found_index] + "\n";
				else
					output += red + (found_index + 1) + ": " + GLOBAL_TIER_LIST[found_index] + "\n";
			}
			message.channel.send(codeBlock(content, output));
			return;
		}
		else if (result.total == 0) {
			message.channel.send(codeBlock(content, `${white}Could not find any results for: ${cyan}${search_word}\n${white}Try using a different search term or use !tier to see a list of available NM Dungeon tiers.`));
			return;
		}
	}
}

exports.help = {
	name: "tier",
	description: "\u001b[0;37mGet Nightmare Dungeon tier list.",
	usage: "\u001b[0;37m!\u001b[0;32mtier \u001b[0;33m[dungeon_name/list]"
};