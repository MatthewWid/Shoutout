import React, {Fragment} from "react";
import axios from "axios";
import UserContext from "../contexts/user.context.js";
import UserPanel from "../components/UserPanel.js";
import FeedPanel from "../components/FeedPanel.js";
import SiteInfoPanel from "../components/SiteInfoPanel.js";

class Home extends React.Component {
	static contextType = UserContext;

	componentDidMount() {
		this.auth();
	}

	// Authenticate if the user is logged in or not (using a cookie) on page load
	auth = async () => {
		const {data} = await axios.get("/api/user/auth", {withCredentials: true});

		this.context.setUser(data.user);
	}

	render() {
		return (
			<div className="content-container">
				<div className="content">
					<UserPanel />
					<FeedPanel />
					<SiteInfoPanel />
				</div>
			</div>
		);
	}
}

export default Home;
