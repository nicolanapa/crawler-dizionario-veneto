import fsPromises from "node:fs/promises";

class FileHandler {
	constructor() {
		this.createStartDirectory();
	}

	async createStartDirectory() {
		const dir = await fsPromises.mkdir("./output/", { recursive: true });

		if (dir === undefined) {
			console.log("Output dir already exists");
		} else {
			console.log("Created: ", dir);
		}
	}

	async writeToFile(data, fileName, extension) {
		const file = await fsPromises.writeFile(
			"./output/" + fileName + "." + extension,
			data
		);

		if (file === undefined) {
			return true;
		} else {
			throw new Error("Error writing data to the File System");
		}
	}
}

export default FileHandler;
