import React, {useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import api from "api";
import serializeObjectToUri from "../helpers/serializeObjectToUri.js";
import ProfileCard from "./ProfileCard.js";
import LoadingIndicator from "./LoadingIndicator.js";

const ProfileUser = (props) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch the user given the search query
	async function getUser() {
		const params = serializeObjectToUri(props.query);
		const {data: {success, user}} = await api.get(`/user?${params}`);

		if (success && user) {
			setUser(user);
		}
		setLoading(false);
	}

	useEffect(() => {
		getUser();
	}, [props.query.username, props.query.nickname, props.query.id]);

	// Show a loading indicator when waiting for data
	if (loading) {
		return <LoadingIndicator className="card" />;
	}

	// Redirect to 404 if received data but no user was found
	if (!loading && !user) {
		return <Redirect to="/404" />;
	}

	return (
		<ProfileCard
			user={user}
			className="content__panel card"
		/>
	);
};

export default ProfileUser;
