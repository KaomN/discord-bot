/*
	Shows Diablo 4 NM dungeon tier.
	1st argument is dungoen name or list to get a list of dungeons.
	!tier [dungeon_name/list].
*/
const { codeBlock } = require("@discordjs/builders");
const fuzzysort = require("fuzzysort");
const { green, cyan, white, yellow, red, blue } = require("../helpers/colors.js");
const { GLOBAL_TIER_LIST_EVENT } = require("../helpers/globals.js");
const { GLOBAL_TIER_LIST_S1_GLYPH, GLOBAL_TIER_LIST_S1_XP, GLOBAL_TIER_LIST_S1_COMBINED } = require("../helpers/globals.js"); // Patch 1.1.0
const { GLOBAL_TIER_LIST_S1_XP_v2, GLOBAL_TIER_LIST_S1_GLYPH_v2 } = require("../helpers/globals.js"); // Patch 1.1.1

exports.run = (message, args) => {
	var output = ""
	var content = "ansi";
	try {
		if (!args[0] || args[0] == "list"){
			output += `${white}List of NM Dungeon tiers:\n`;
			for (var i = 0; i < GLOBAL_TIER_LIST_S1_XP_v2.length; i++) {
				if (i < 5)
					output += blue + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[i] + "\n";
				else if (i > 4 && i < 19)
					output += green + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[i] + "\n";
				else if (i > 18 && i < 26)
					output += yellow + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[i] + "\n";
				else
					output += red + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[i] + "\n";
			}
			message.channel.send(codeBlock(content, output));
			return;
		}
		else if ((args[0] == "glyph" || args[0] == "-glyph" || args[0] == "g" || args[0] == "-g") && args[1] == null) {
			output += `${white}List of Glyph leveling NM Dungeon tiers:\n`;
			for (var i = 0; i < GLOBAL_TIER_LIST_S1_GLYPH_v2.length; i++) {
				if (i < 5)
					output += blue + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_GLYPH_v2[i] + "\n";
				else if (i > 4 && i < 19)
					output += green + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_GLYPH_v2[i] + "\n";
				else if (i > 18 && i < 26)
					output += yellow + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_GLYPH_v2[i] + "\n";
				else
					output += red + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_GLYPH_v2[i] + "\n";
			}
			message.channel.send(codeBlock(content, output));
			return;
		}
		else if ((args[0] == "glyph" || args[0] == "-glyph" || args[0] == "g" || args[0] == "-g") && args[1] != null) {
			args.shift();
			const search_word = args.join(" ");
			result = fuzzysort.go(search_word, GLOBAL_TIER_LIST_S1_GLYPH_v2);
			var output = ""
			var found_index = null
			if (result.total != 0){
				output += `${white}Glyph Leveling Tier Dungeon:\n`;
				for (var i = 0; i < result.total; i++) {
					found_index = GLOBAL_TIER_LIST_S1_GLYPH_v2.indexOf(result[i].target);
					if (found_index < 5)
						output += blue + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_GLYPH_v2[found_index] + "\n";
					else if (found_index > 4 && found_index < 19)
						output += green + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_GLYPH_v2[found_index] + "\n";
					else if (found_index > 18 && found_index < 26)
						output += yellow + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_GLYPH_v2[found_index] + "\n";
					else
						output += red + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_GLYPH_v2[found_index] + "\n";
				}
				message.channel.send(codeBlock(content, output));
				return;
			}
			else if (result.total == 0) {
				message.channel.send(codeBlock(content, `${white}Could not find any results for: ${cyan}${search_word}\n${white}Try using a different search term or use !tier to see a list of available NM Dungeon tiers.`));
				return;
			}
		}
		else if ((args[0] == "-xp" || args[0] == "xp") && args[1] == null) {
			output += `${white}List of XP/H NM Dungeon tiers:\n`;
			for (var i = 0; i < GLOBAL_TIER_LIST_S1_XP_v2.length; i++) {
				if (i < 5)
					output += blue + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[i] + "\n";
				else if (i > 4 && i < 19)
					output += green + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[i] + "\n";
				else if (i > 18 && i < 26)
					output += yellow + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[i] + "\n";
				else
					output += red + (i + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[i] + "\n";
			}
			message.channel.send(codeBlock(content, output));
			return;
		}
		else if ((args[0] == "-xp" || args[0] == "xp") && args[1] != null) {
			args.shift();
			const search_word = args.join(" ");
			result = fuzzysort.go(search_word, GLOBAL_TIER_LIST_S1_XP_v2);
			var output = ""
			var found_index = null
			if (result.total != 0){
				output += `${white}XP/H Tier Dungeon:\n`;
				for (var i = 0; i < result.total; i++) {
					found_index = GLOBAL_TIER_LIST_S1_XP_v2.indexOf(result[i].target);
					if (found_index < 5)
						output += blue + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[found_index] + "\n";
					else if (found_index > 4 && found_index < 19)
						output += green + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[found_index] + "\n";
					else if (found_index > 18 && found_index < 26)
						output += yellow + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[found_index] + "\n";
					else
						output += red + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[found_index] + "\n";
				}
				message.channel.send(codeBlock(content, output));
				return;
			}
			else if (result.total == 0) {
				message.channel.send(codeBlock(content, `${white}Could not find any results for: ${cyan}${search_word}\n${white}Try using a different search term or use !tier to see a list of available NM Dungeon tiers.`));
				return;
			}
		}
		else if ((args[0] == "event" || args[0] == "e") && args[1] == null) {
			output += `${white}Events worth doing in NM dungeons:\n`;
			for (var i = 0; i < GLOBAL_TIER_LIST_EVENT.length; i++) {
				output += blue + (i + 1) + ": " + GLOBAL_TIER_LIST_EVENT[i] + "\n";
			}
			message.channel.send(codeBlock(content, output));
			return;
		}
		else if (args[0] != null) {
			const search_word = args.join(" ");
			result = fuzzysort.go(search_word, GLOBAL_TIER_LIST_S1_XP_v2);
			var output = ""
			var found_index = null
			if (result.total != 0){
				output += `${white}Combined Tier Dungeon:\n`;
				for (var i = 0; i < result.total; i++) {
					found_index = GLOBAL_TIER_LIST_S1_XP_v2.indexOf(result[i].target);
					if (found_index < 5)
						output += blue + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[found_index] + "\n";
					else if (found_index > 4 && found_index < 19)
						output += green + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[found_index] + "\n";
					else if (found_index > 18 && found_index < 26)
						output += yellow + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[found_index] + "\n";
					else
						output += red + (found_index + 1) + ": " + GLOBAL_TIER_LIST_S1_XP_v2[found_index] + "\n";
				}
				message.channel.send(codeBlock(content, output));
				return;
			}
			else if (result.total == 0) {
				message.channel.send(codeBlock(content, `${white}Could not find any results for: ${cyan}${search_word}\n${white}Try using a different search term or use !tier to see a list of available NM Dungeon tiers.`));
				return;
			}
		}
	} catch (err) {
		console.log(err);
	}
}

exports.help = {
	name: "tier",
	description: "\u001b[0;37mGet Nightmare Dungeon tier list.",
	usage: "\u001b[0;37m!\u001b[0;32mtier \u001b[0;33m[dungeon_name/list]"
};