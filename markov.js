/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		this.chains = {};
		for (let i = 0; i < this.words.length; i++) {
			if (!this.chains[this.words[i]]) {
				this.chains[this.words[i]] = [ this.words[i + 1] ? this.words[i + 1] : null ];
			} else {
				this.chains[this.words[i]].push(this.words[i + 1] ? this.words[i + 1] : null);
			}
		}
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		let starter = this.words[Math.floor(Math.random() * this.words.length)];
		let text = [ starter ];
		for (let i = 0; i < numWords - 1; i++) {
			if (this.chains[text[i]] != null) {
				let len = this.chains[text[i]].length;
				text.push(this.chains[text[i]][Math.floor(Math.random() * len)]);
			} else {
				text.push(this.words[Math.floor(Math.random() * this.words.length)]);
			}
		}
		return text.length;
	}
}
