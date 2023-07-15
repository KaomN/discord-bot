const axios = require("axios");
const controller = new AbortController();

function newAbortSignal(timeoutMs) {
	const abortController = new AbortController();
	setTimeout(() => abortController.abort(), timeoutMs || 0);
  
	return abortController.signal;
  }

function getEvents() {
	const url = "https://d4armory.io/api/events/recent"
	let data = axios.get(url, {
		signal: newAbortSignal(10000) // 10seconds
	})
	.then (response => {
		return response.data;
	})
	.catch(error => {
		if (error.code === 'ERR_CANCELED') {
		  return false;
		} else {
			console.log(error.message);
		}
	});
	return data;
}

module.exports = { getEvents };