import React, {useState, useEffect} from "react";
import api from "api";
import serializeObjectToUri from "../helpers/serializeObjectToUri.js";
import LoadingIndicator from "./LoadingIndicator.js";
import FollowList from "./FollowList.js";

const PanelFollow = (props) => {
	const [followList, setFollowList] = useState([]);
	const [loading, setLoading] = useState(false);

	async function fetchFollows() {
		if (!props.username) {
			return;
		}

		setLoading(true);

		const {data} = await api.get("/user/follow", {
			params: {
				list: props.list || "followers",
				username: props.username
			}
		});

		setLoading(false);
		setFollowList(data.followList);
	}

	useEffect(() => {
		fetchFollows();
	}, []);

	let content = null;
	if (loading && followList.length === 0) {
		content = <LoadingIndicator className="content__panel" />;
	} else {
		content = <FollowList followList={followList} />;
	}

	return (
		<main className="content__panel card panel-follow">
			{content}
		</main>
	);
};

export default PanelFollow;
