import React, {Fragment} from "react";
import Header from "./Header.js";

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<Header />
				{/*
				<ContentContainer>
					<UserPanel />
					<PostList />
					<SiteStats />
				</ContentContainer>
				*/}
				<p>App</p>
			</Fragment>
		);
	}
}

export default App;
