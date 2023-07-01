/*
	Shows Diablo 4 NM dungeon tier.
	1st argument is dungoen name or list to get a list of dungeons.
	!tier [dungeon_name/list].
*/
const { codeBlock } = require("@discordjs/builders");
const fuzzysort = require("fuzzysort");


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
	"Crusaders' Catherdral",
	"Dark Ravine",
	"The Onyx Hold",
	"Shivta Ruins",
	"Witchwater",
	"Abondoned Mineworks",
	"Cultist Refuge",
	"Demon's Wake",
	"Lost Archives",
	"Prison of Caldeum",
	"Whispering Pines",
	"Zenith",
	"Ferals' Den",
	"Guulrahn Slums",
	"Shadow Plunge",
	"Conclave",
	"Black Asylum"
]

const GLOBAL_TIER_LIST_SEARCH = [
	"blind burrows",
	"champions demise",
	"earthen wound",
	"renegades retreat",
	"sunken ruins",
	"aldurwood",
	"guulrahn canals",
	"kor dragan baracks",
	"maugans works",
	"maulwood",
	"raethwind wilds",
	"serpents lair",
	"ancients lament",
	"crusaders' catherdral",
	"dark ravine",
	"the onyx hold",
	"shivta ruins",
	"witchwater",
	"abondoned mineworks",
	"cultist refuge",
	"demons wake",
	"lost archives",
	"prison of caldeum",
	"whispering pines",
	"zenith",
	"ferals den",
	"guulrahn slums",
	"shadow plunge",
	"conclave",
	"black asylum"
]

exports.run = (message, args) => {
	var output = ""
	var green = "\u001b[0;32m";
	var cyan = "\u001b[0;36m";
	var white = "\u001b[0;37m";
	var yellow = "\u001b[0;33m";
	var red = "\u001b[0;31m";
	var blue = "\u001b[0;34m";
	var content = "ansi";
	if (args[0].toLowerCase() === "list") {
		for (var i = 0; i < GLOBAL_TIER_LIST.length; i++) {
			if (i < 5)
				output += cyan + (i + 1) + ": " + GLOBAL_TIER_LIST[i] + "\n";
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
	else if (args[0] != undefined) {
		var search_word = args[0]
		//var index = GLOBAL_TIER_LIST_SEARCH.indexOf(search_word);
		result = fuzzysort.go(search_word, GLOBAL_TIER_LIST, {});
		var output = ""
		var found_index = null
		if (result.total != 0){
			for (var i = 0; i < result.total; i++) {
				found_index = GLOBAL_TIER_LIST.indexOf(result[i].target);
				if (found_index < 5)
					output += cyan + (found_index + 1) + ": " + GLOBAL_TIER_LIST[found_index] + "\n";
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
		else if (result.total == 0){
			message.channel.send(codeBlock(content, `Could not find any results for: ${cyan}${args[0]}\nTry using a different search term or use !tier list to see all available NM Dungeon tiers.`));
			return;
		}
	}
}

exports.help = {
	name: "tier",
	description: "\u001b[0;37mGet NM Dungeon tier list..",
	usage: "\u001b[0;37m!\u001b[0;32mtier \u001b[0;33m[dungeon_name/list]"
};

exports.helpMobile = {
	name: "tier",
	description: "Get NM Dungeon tier list.",
	usage: "!tier [dungeon_name/list]"
};