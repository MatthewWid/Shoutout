import React, {useState, useEffect, useRef} from "react";
import {Redirect} from "react-router-dom";
import api from "api";
import serializeObjectToUri from "../helpers/serializeObjectToUri.js";
import ProfileCard from "./ProfileCard.js";
import LoadingIndicator from "./LoadingIndicator.js";

const ProfileUser = (props) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const loadingFollow = useRef(false);

	// Fetch the user given the search query
	async function getUser() {
		const params = serializeObjectToUri(props.query);
		const {data: {success, user}} = await api.get(`/user?${params}`);

		if (success && user) {
			setUser(user);
		}
		setLoading(false);
	}

	async function toggleFollow() {
		if (!user) {
			return;
		}
		if (loadingFollow.current) {
			return;
		}

		loadingFollow.current = true;

		const {isFollowing} = user;
		const {data: {success, followStatus}} = await api[isFollowing ? "delete" : "post"](`/user/${user._id}/follow`);

		if (success && typeof followStatus === "boolean") {
			setUser({
				...user,
				isFollowing: followStatus
			});
		}

		loadingFollow.current = false;
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

	const {isFollowing} = user;

	return (
		<ProfileCard
			user={user}
			className="content__panel card"
		>
			<button
				className={`profile-card__follow button button--primary${isFollowing && " button--primary-inverted" || ""}`}
				onClick={toggleFollow}
			>
				{isFollowing ? "Unfollow" : "Follow"}
			</button>
		</ProfileCard>
	);
};

export default ProfileUser;
