import jsdom from "jsdom";
import handleLocalization from "./handleLocalization.js";

// To silence a jsdom Error
console.error = (message, ...optionalParams) => {
	if (message.includes("Could not parse CSS stylesheet")) {
		return;
	}
	originalConsoleError(message, ...optionalParams);
};

const { JSDOM } = jsdom;

class Dom {
	constructor(html) {
		this.dom = new JSDOM(html);

		// To remove an useless class in the future words variable
		const classElements =
			this.dom.window.window.document.querySelectorAll(".rollnarans");
		classElements.forEach((element) => {
			element.removeAttribute("class");
		});
	}

	getBody() {
		return this.dom.window.document.body;
	}

	getMainPageBodyItems() {
		const words =
			this.dom.window.document.body.querySelectorAll(".sototitolo");
		const grammarStructures =
			this.dom.window.document.body.querySelectorAll(".corpoceo");

		return [words, grammarStructures];
	}

	getIdPageBodyItem() {
		const translationElements =
			this.dom.window.document.body.querySelectorAll(".corpo");

		const translations = this.getValues(translationElements).find(
			(value) => value.includes("English") || value.includes("Italiano")
		);

		const localizationElements =
			this.dom.window.document.body.querySelectorAll(".align-left");

		const srcLocalizations = this.getValues(
			localizationElements,
			false,
			"src"
		);

		const localizations = handleLocalization(srcLocalizations);

		return {
			italian:
				translations !== undefined
					? translations
							.substring(translations.indexOf("Italiano:") + 9)
							.replace(/\s\s+/g, " ")
							.trim()
					: "",
			english:
				translations !== undefined
					? translations
							.substring(
								translations.indexOf("English:") + 8,
								translations.indexOf("Italiano:")
							)
							.replace(/\s\s+/g, " ")
							.trim()
					: "",
			localization: localizations,
		};
	}

	getValues(arrayIterator, returnAsText = true, returnField = "") {
		const iterator = arrayIterator.values();
		let updatedArray = Array(arrayIterator.length);

		let i = 0;
		for (const value of iterator) {
			if (returnAsText) {
				updatedArray[i] = value.textContent.replace("- ", "");
			} else if (returnField === "src") {
				updatedArray[i] = value.src;
			} else {
				updatedArray[i] = value.innerHTML;
			}

			i++;
		}

		return updatedArray;
	}
}

export default Dom;
