import React, {useState, useEffect} from "react";
import api from "api";
import serializeObjectToUri from "../helpers/serializeObjectToUri.js";
import ProfileCard from "./ProfileCard.js";

const ProfileUser = (props) => {
	const [user, setUser] = useState(null);

	// Fetch the user given the search query
	async function getUser() {
		const params = serializeObjectToUri(props.query);
		const {data: {success, user}} = await api.get(`/user?${params}`);

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
		<ProfileCard
			user={user}
			className="content__panel card"
		/>
	);
};

export default ProfileUser;
