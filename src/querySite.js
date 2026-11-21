import Dom from "./Dom.js";
import fileOutputWriting from "./fileOutputWriting.js";
import handleMainBody from "./handleMainBody.js";

// querySite(numberOfWordsToFetch: min = 0, max = 39820)
async function querySite(numberOfWordsToFetch = 20) {
	console.time("fullProcess");

	// Since the server only outputs 20 elements per page, the number has to be divisible by 20
	if (numberOfWordsToFetch % 20 !== 0) {
		for (let i = 0; i < 20; i++) {
			numberOfWordsToFetch++;

			if (numberOfWordsToFetch % 20 === 0) {
				break;
			}
		}
	} else if (numberOfWordsToFetch < 0) {
		numberOfWordsToFetch = 0;
	} else if (numberOfWordsToFetch > 39820) {
		numberOfWordsToFetch = 39820;
	}

	let bodiesInstances = [];

	for (let i = 0; i < numberOfWordsToFetch; i += 20) {
		console.log("Offset:", i, "|", new Date().toISOString());

		// let request;
		/*const response = */ await fetch(
			"https://www.elgalepin.com/linguaveneta-vec.asp?offset=" +
				i /*"&ciave=" // (Local) Search word feature? */
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Error fetching content from the page");
				}

				return res.text();
			})
			.then((html) => {
				// Fetching the pages is a bit slow
				//console.log("Offset Middle:", i, new Date().toISOString());

				const dom = new Dom(html);

				bodiesInstances.push(dom);
			});
	}

	let data = {
		words: [],
		grammarStructures: [],
		translations: {
			italian: [],
			english: [],
		},
		localizations: [],
	};

	let tempWordsId = [];

	for (let i = 0; i < bodiesInstances.length; i++) {
		let tempData = handleMainBody(bodiesInstances[i]);

		for (let i2 = 0; i2 < tempData.words.length; i2++) {
			data.words.push(tempData.words[i2]);
			tempWordsId.push(tempData.wordsId[i2]);
			data.grammarStructures.push(tempData.grammarStructures[i2]);
		}
	}

	bodiesInstances = null;

	console.time("fetchIdsBody");
	console.log();

	let i0 = -20;
	for (let i = 0; i < tempWordsId.length; i++) {
		if (i - 20 === i0) {
			console.log("Offset:", i, "|", new Date().toISOString());

			i0 += 20;
		}

		// console.time("fetchIdBody");

		await fetch(
			"https://www.elgalepin.com/linguaveneta-detalio.asp?ID=" +
				tempWordsId[i]
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error("Error fetching content from the page");
				}

				return res.text();
			})
			.then((html) => {
				const dom = new Dom(html);

				const translationsLocalizations = dom.getIdPageBodyItem();
				data.translations.italian.push(
					translationsLocalizations.italian
				);
				data.translations.english.push(
					translationsLocalizations.english
				);
				data.localizations.push(translationsLocalizations.localization);
			});

		// console.timeEnd("fetchIdBody");
	}

	console.timeEnd("fetchIdsBody");

	console.log(
		data,
		data.words.length,
		data.grammarStructures.length,
		[data.translations.italian.length, data.translations.english.length],
		data.localizations.length
	);

	fileOutputWriting(data);

	console.timeEnd("fullProcess");
}

export default querySite;
