/** Command-line tool to generate Markov text. */
const axios = require('axios');
const fs = require('fs');
const { MarkovMachine } = require('./markov');

let specifier = process.argv[2];
let path = process.argv[3];

function fileText() {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('ERROR:', err);
			process.kill(1);
		}
		let text = new MarkovMachine(data);
		text.makeText(50);
	});
}
async function urlText() {
	try {
		let res = await axios.get(path);
		let text = new MarkovMachine(res.data);
		text.makeText(50);
	} catch (e) {
		console.log(`Error fetching ${path}:`, e);
		process.kill(1);
	}
}

specifier.includes('file') ? fileText() : urlText();
