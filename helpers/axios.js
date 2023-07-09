const axios = require("axios");

async function getEvents() {
	const url = "https://d4armory.io/api/events/recent"
	let response = await axios.get(url);
	return response.data;
}

module.exports = { getEvents };