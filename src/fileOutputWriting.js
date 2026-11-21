import FileHandler from "./FileHandler.js";

async function fileOutputWriting(data) {
	const fileHandler = new FileHandler();

	// JSON Files
	fileHandler.writeToFile(JSON.stringify(data.words), "words", "json");
	fileHandler.writeToFile(
		JSON.stringify(data.grammarStructures),
		"grammarStructures",
		"json"
	);
	fileHandler.writeToFile(
		JSON.stringify(data.translations),
		"translations",
		"json"
	);
	fileHandler.writeToFile(
		JSON.stringify(data.translations.italian),
		"italianTranslations",
		"json"
	);
	fileHandler.writeToFile(
		JSON.stringify(data.translations.english),
		"englishTranslations",
		"json"
	);
	fileHandler.writeToFile(
		JSON.stringify(data.localizations),
		"localizations",
		"json"
	);
	fileHandler.writeToFile(JSON.stringify(data), "data", "json");

	fileHandler.writeToFile(htmlHelper(data), "data", "html");
}

function htmlHelper(data) {
	if (
		data.words.length !== data.grammarStructures.length &&
		data.words.length !== data.translations.length
	) {
		throw new Error("Data's wrong");
	}

	let html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dizionario Veneto-Italiano-Inglese</title>

        <style>
            * {
                font-family: "Arial";
            }
            
            p {
                padding: 2.5px 7.5px;
                margin: 5px 10px;
            }

            .green {
                font-size: 1.05em;
                color: #0c9100ff;
            }

            .blue {
                color: #006691ff;
            }

            .red {
                color: #911300ff;
            }
        </style>
    </head>
    <body>
    `;

	for (let i = 0; i < data.words.length; i++) {
		let word = `    <p>
            <strong class="green">${data.words[i]}</strong> - `;

		word += `${data.grammarStructures[i]} | <strong class="blue">${data.translations.italian[i]}</strong> | <strong class="red">${data.translations.english[i]}</strong> | `;

		word += `${data.localizations[i].join(", ")}
        </p>

	`;

		html += word;
	}

	html += `</body>
</html>`;

	return html;
}

export default fileOutputWriting;
