import React, {Fragment} from "react";
import Header from "./Header.js";
import UserPanel from "./UserPanel.js";
import PostFeed from "./PostFeed.js";
import SiteInfo from "./SiteInfo.js";

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<Header />
				<div className="content">
					<div className="content__inner">
						<UserPanel />
						<PostFeed />
						<SiteInfo />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default App;
