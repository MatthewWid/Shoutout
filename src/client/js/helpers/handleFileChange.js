import {IMAGE_MAX_SIZE, IMAGE_ALLOWED_TYPES} from "constants";
import getFileContents from "./getFileContents.js";

async function handleFileChange ({target}) {
	const [file] = target.files;
	if (!file) {
		this.setState({
			[target.name]: "",
			errors: []
		});
		return;
	}

	const {name} = target;
	// Ensure valid file size
	if (file.size > IMAGE_MAX_SIZE) {
		this.setState({
			[name]: "",
			errors: [`${name.charAt(0).toUpperCase() + name.slice(1)} image cannot be more than 4MB.`]
		});
		target.value = "";
		return;
	}

	// Ensure valid file type
	if (!IMAGE_ALLOWED_TYPES.includes(file.type)) {
		this.setState({
			[name]: "",
			errors: [`${name.charAt(0).toUpperCase() + name.slice(1)} must be a JPEG or PNG image.`]
		});
		target.value = "";
		return;
	}

	const contents = await getFileContents(file);
	
	this.setState({
		[name]: contents,
		errors: []
	});
}

export default handleFileChange;
