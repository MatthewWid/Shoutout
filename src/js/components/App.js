import React, {Fragment} from "react";
import axios from "axios";
import Header from "./Header.js";
import UserPanel from "./UserPanel.js";
import PostFeed from "./PostFeed.js";
import SiteInfo from "./SiteInfo.js";

class App extends React.Component {
	state = {
		text: ""
	};

	componentDidMount() {
		axios.get("/api/ping")
			.then(({data: res}) => {
				this.setState({
					text: res
				});
			});
	}

	render() {
		return (
			<Fragment>
				<Header />
				<div className="content">
					<div className="content__inner">
						<UserPanel />
						<PostFeed text={this.state.text} />
						<SiteInfo />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default App;
