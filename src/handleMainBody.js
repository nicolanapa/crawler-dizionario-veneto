function handleMainBody(dom) {
	const body = dom.getMainPageBodyItems();

	const [htmlWords, words, grammarStructures] = [
		dom.getValues(body[0], false),
		dom.getValues(body[0]),
		dom.getValues(body[1]),
	];

	let wordsId = Array(htmlWords.length);

	// The position of the ID query string should be always the same
	let idIndex = htmlWords[0].indexOf("ID=") + 3;
	for (let i = 0; i < htmlWords.length; i++) {
		if (htmlWords[i].includes("ID=")) {
			wordsId[i] = htmlWords[i].substring(idIndex, htmlWords[i].lastIndexOf('"'));
		} else {
			wordsId[i] = null;
		}
	}

	return {
		words,
		wordsId,
		grammarStructures,
	};
}

export default handleMainBody;
