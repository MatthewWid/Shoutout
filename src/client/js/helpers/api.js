import axios from "axios";

const api = axios.create({
	baseURL: "/api/",
	withCredentials: true,
	validateStatus: (status) => status < 500
});

export default api;
