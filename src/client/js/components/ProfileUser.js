import React, {useState, useEffect} from "react";
import axios from "axios";
import serializeObjectToUri from "../helpers/serializeObjectToUri.js";
import ProfileCard from "./ProfileCard.js";

const ProfileUser = (props) => {
	const [user, setUser] = useState(null);

	// Fetch the user given the search query
	async function getUser() {
		const params = serializeObjectToUri(props.query);
		const request = `/api/user?${params}`;
		const {data: {success, user}} = await axios.get(request);

		if (success && user) {
			setUser(user);
		}
	}

	useEffect(() => {
		getUser();
	}, [props.query.username, props.query.nickname, props.query.id]);

	if (!user) {
		return null;
	}

	return (
		<ProfileCard user={user} />
	);
};

export default ProfileUser;
