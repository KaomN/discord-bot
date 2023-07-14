/*
	Helper function to check if message was sent from Mobile or Desktop.
	As mobile does not support codeBlock(ansi);
	NOT USED ANYMORE
*/
function getDevices(message) {
	const device = message.member.presence.clientStatus || {}
	return device;
}
module.exports = { getDevices };
