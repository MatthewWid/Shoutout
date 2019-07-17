import React from "react";
import axios from "axios";
import SiteStat from "./SiteStat.js";

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
		return (
			<div className="stats">
				<div className="stats__list">
					<SiteStat stat="Users" number={this.state.users} />
					<SiteStat stat="Posts" number={this.state.posts} />
					<SiteStat stat="Likes" number={this.state.likes} />
				</div>
			</div>
		);
	}
}

export default SiteStats;
