// Read the contents of a File and return as a Base64 encoded string
module.exports = (file) => (
	new Promise((res, rej) => {
		const fr = new FileReader();
		fr.addEventListener("load", () => {
			res(fr.result);
		});
		fr.addEventListener("error", () => {
			reader.abort();
			rej(fr.result);
		});
		fr.readAsDataURL(file);
	})
);
