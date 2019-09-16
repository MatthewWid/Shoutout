import React, {useState, useEffect, useContext, useRef} from "react";
import {Redirect} from "react-router-dom";
import UserContext from "../contexts/user.context.js";
import api from "api";
import ProfileCard from "./ProfileCard.js";
import LoadingIndicator from "./LoadingIndicator.js";

const ProfileUser = (props) => {
	const loggedUser = useContext(UserContext);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const loadingFollow = useRef(false);

	// Fetch the user given the search query
	async function getUser() {
		const {query = {}} = props;
		const {data: {success, user}} = await api.get("/user", {
			params: {...query}
		});

		if (success && user) {
			setUser(user);
			props.foundUser && props.foundUser(user);
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

	let followButton = null;
	if (loggedUser.user && user._id !== loggedUser.user._id) {
		const {isFollowing} = user;
		followButton = (
			<button
				className={`profile-card__follow button button--primary${isFollowing && " button--primary-inverted" || ""}`}
				onClick={toggleFollow}
			>
				{isFollowing ? "Unfollow" : "Follow"}
			</button>
		);
	}

	return (
		<ProfileCard
			className="content__panel card"
			user={user}
			withSettings={loggedUser.user && user._id === loggedUser.user._id}
		>
			{followButton}
		</ProfileCard>
	);
};

export default ProfileUser;
