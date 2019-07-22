import React from "react";
import axios from "axios";

class SiteStats extends React.Component {
	state = {
		users: 0,
		posts: 0,
		likes: 0
	}

	componentDidMount() {
		this.getSiteStats();
	}

	// Get website statistics (total posts, users and likes) and set them in state
	getSiteStats = async () => {
		const res = await axios.get("/api/stats");

		const stats = {
			...this.state,
			...res.data.stats
		};

		this.setState({...stats});
	}

	render() {
		const {users, posts, likes} = this.state;

		const stat = (name, number) => (
			<div className="stat">
				<div className="stat__number">{number}</div>
				<div className="stat__text">{name}</div>
			</div>
		);

		return (
			<div className="stats">
				<div className="stats__list">
					{stat("Users", users)}
					{stat("Posts", posts)}
					{stat("Likes", likes)}
				</div>
			</div>
		);
	}
}

export default SiteStats;
