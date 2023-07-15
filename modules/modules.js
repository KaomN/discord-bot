/*
	Collection of helper functions
*/

function getNickname(message) {
	const name = message.member.nickname ? message.member.nickname : message.author.username;
	return name;
}

module.exports = {
	getNickname
}