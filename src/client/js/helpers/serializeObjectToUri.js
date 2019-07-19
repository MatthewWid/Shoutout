export default (obj = {}) => (
	Object.keys(obj).map((k) => (
		`${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`
	)).join("&")
);
