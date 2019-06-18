import React, {Fragment} from "react";
import axios from "axios";
import Header from "./Header.js";
import UserPanel from "./UserPanel.js";
import PostFeed from "./PostFeed.js";
import SiteInfo from "./SiteInfo.js";

class App extends React.Component {
	postMessage = (message) => {
		console.log("Posting a message:");
		console.log(message);
	};

	render() {
		return (
			<Fragment>
				<Header />
				<div className="content">
					<div className="content__inner">
						<UserPanel />
						<PostFeed postMessage={this.postMessage} />
						<SiteInfo />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default App;
