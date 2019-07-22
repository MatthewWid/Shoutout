/*
	Serialize an object to URL query parameters.

	Eg,
	
		{
			foo: "bar",
			num: 1
		}

		is converted to:

		foo=bar&num=1
*/
export default (obj = {}) => (
	Object.keys(obj).map((k) => (
		`${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`
	)).join("&")
);
